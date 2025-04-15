import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FaqService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createFaqDto: CreateFaqDto) {
    try {
      let created = await this.prisma.fAQ.create({ data: createFaqDto })
      return created
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findAll(page = 1, limit = 10, search = '') {
    try {
      const pageNumber = Number(page)
      const limitNumber = Number(limit)
      let findAll = await this.prisma.fAQ.findMany({
        where: {
          question_en: {
            startsWith: search,
            mode: "insensitive"
          },
          question_ru: {
            startsWith: search,
            mode: "insensitive"
          },
          question_uz: {
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
      let findOne = await this.prisma.fAQ.findUnique({ where: { id } })
      if (!findOne) return new NotFoundException("Not found")
      return findOne
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async update(id: string, updateFaqDto: UpdateFaqDto) {
    try {
      let updated = await this.prisma.capasity.update({
        data: updateFaqDto,
        where: { id }
      })
      return updated
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async remove(id: string) {
    try {
      let deleted = await this.prisma.fAQ.delete({ where: { id } })
      return deleted
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}
