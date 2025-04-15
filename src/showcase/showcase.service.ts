import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateShowcaseDto } from './dto/create-showcase.dto';
import { UpdateShowcaseDto } from './dto/update-showcase.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ShowcaseService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createShowcaseDto: CreateShowcaseDto) {
    try {
      let created = await this.prisma.showCase.create({ data: createShowcaseDto })
      return created
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findAll(page = 1, limit = 10, search = '') {
    try {
      const pageNumber = Number(page)
      const limitNumber = Number(limit)
      let findAll = await this.prisma.showCase.findMany({
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
      return findAll
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findOne(id: string) {
    try {
      let findOne = await this.prisma.showCase.findUnique({ where: { id } })
      if (!findOne) return new NotFoundException("Not found")
      return findOne
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async update(id: string, updateShowcaseDto: UpdateShowcaseDto) {
    try {
      let updated = await this.prisma.showCase.update({
        data: updateShowcaseDto,
        where: { id }
      })
      return updated
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async remove(id: string) {
    try {
      let deleted = await this.prisma.showCase.delete({ where: { id } })
      return deleted
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}
