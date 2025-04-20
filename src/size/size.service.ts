import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SizeService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createSizeDto: CreateSizeDto) {
    try {
      let created = await this.prisma.size.create({ data: createSizeDto })
      return created
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findAll(page = 1, limit = 10, search = '') {
    try {
      const pageNumber = Number(page)
      const limitNumber = Number(limit)

      let sizes = await this.prisma.size.findMany({
        where: {
          OR: [
            {
              name_en: {
                startsWith: search,
                mode: "insensitive"
              }
            },
            {
              name_ru: {
                startsWith: search,
                mode: "insensitive"
              }
            },
            {
              name_uz: {
                startsWith: search,
                mode: "insensitive"
              }
            }
          ]
        },
        skip: (pageNumber - 1) * limitNumber,
        take: limitNumber,
        include: {
          Tool: true
        }
      })
      return sizes
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findOne(id: string) {
    try {
      let size = await this.prisma.size.findUnique({
        where: { id },
        include: {
          Tool: true
        }
      })
      if (!size) return new NotFoundException("Not found")
      return size
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async update(id: string, updateSizeDto: UpdateSizeDto) {
    try {
      let updated = await this.prisma.size.update({
        data: updateSizeDto,
        where: { id }
      })
      return updated
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async remove(id: string) {
    try {
      let deleted = await this.prisma.size.delete({ where: { id } })
      return deleted
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}
