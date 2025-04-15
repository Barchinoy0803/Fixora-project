import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateAboutUsDto } from './dto/create-about_us.dto';
import { UpdateAboutUsDto } from './dto/update-about_us.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AboutUsService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createAboutUsDto: CreateAboutUsDto) {
    try {
      let created = await this.prisma.about_Us.create({ data: createAboutUsDto })
      return created
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findAll(page = 1, limit = 10, search = '') {
    try {
      const pageNumber = Number(page)
      const limitNumber = Number(limit)

      let findAll = await this.prisma.about_Us.findMany({
        where: {
          generalInformation_en: {
            startsWith: search,
            mode: "insensitive"
          },
          generalInformation_ru: {
            startsWith: search,
            mode: "insensitive"
          },
          generalInformation_uz: {
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
      let findOne = await this.prisma.about_Us.findUnique({ where: { id } })
      if (!findOne) return new NotFoundException("Not found")      
      return findOne
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async update(id: string, updateAboutUsDto: UpdateAboutUsDto) {
    try {
      let updated = await this.prisma.about_Us.update({
        data: updateAboutUsDto,
        where: { id }
      })
      return updated
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async remove(id: string) {
    try {
      let deleted = await this.prisma.about_Us.delete({ where: { id } })
      return deleted
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}
