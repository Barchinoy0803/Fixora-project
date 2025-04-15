import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCapasityDto } from './dto/create-capasity.dto';
import { UpdateCapasityDto } from './dto/update-capasity.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CapasityService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createCapasityDto: CreateCapasityDto) {
    try {
      let created = await this.prisma.capasity.create({ data: createCapasityDto })
      return created
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findAll(page = 1, limit = 10, search = '') {
    try {
      const pageNumber = Number(page)
      const limitNumber = Number(limit)
      let capasities = await this.prisma.capasity.findMany({
        where: {
          name_en: {
            startsWith: search,
            mode: "insensitive"
          },
          name_ru: {
            startsWith: search,
            mode: "insensitive"
          },
          name_uz: {
            startsWith: search,
            mode: "insensitive"
          }
        },
        skip: (pageNumber - 1) * limitNumber,
        take: limitNumber
      })
      return capasities
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findOne(id: string) {
    try {
      let capasity = await this.prisma.capasity.findUnique({ where: { id } })
      if (!capasity) return new NotFoundException("Not found")
      return capasity
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async update(id: string, updateCapasityDto: UpdateCapasityDto) {
    try {
      let updated = await this.prisma.capasity.update({
        data: updateCapasityDto,
        where: { id }
      })
      return updated
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async remove(id: string) {
    try {
      let deleted = await this.prisma.capasity.delete({ where: { id } })
      return deleted
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}
