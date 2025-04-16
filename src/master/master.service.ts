import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateMasterDto } from './dto/create-master.dto';
import { UpdateMasterDto } from './dto/update-master.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MasterService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createMasterDto: CreateMasterDto) {
    try {
      let master = await this.prisma.master.create({ data: createMasterDto })
      return master
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findAll(page = 1, limit = 10, search = '') {
    try {
      const pageNumber = Number(page)
      const limitNumber = Number(limit)

      let masters = await this.prisma.master.findMany({
        include: { MasterProfession: true, orderMaster: true },
        skip: (pageNumber - 1) * limitNumber,
        take: limitNumber,
        where: {
          OR: [
            {
              firstname: {
                startsWith: search,
                mode: "insensitive"
              }
            },
            {
              lastname: {
                startsWith: search,
                mode: "insensitive"
              }
            },
            {
              phoneNumber: {
                startsWith: search,
                mode: "insensitive"
              }
            }
          ]
        }
      })
      return masters
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findOne(id: string) {
    try {
      let master = await this.prisma.master.findUnique({ where: { id } })
      if (!master) return new NotFoundException("Not found")
      return master
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async update(id: string, updateMasterDto: UpdateMasterDto) {
    try {
      let updated = await this.prisma.master.update({
        data: updateMasterDto,
        where: { id }
      })
      return updated
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async remove(id: string) {
    try {
      let deleted = await this.prisma.master.delete({ where: { id } })
      return deleted
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}
