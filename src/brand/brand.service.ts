import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BrandService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createBrandDto: CreateBrandDto) {
    try {
      let created = await this.prisma.brand.create({ data: createBrandDto })
      return created
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  async findAll(page = 1, limit = 10, search = '') {
    try {
      const pageNumber = Number(page)
      const limitNumber = Number(limit)

      let brands = await this.prisma.brand.findMany({
        where: {
          OR: [
            { name_en: { startsWith: search, mode: "insensitive" } },
            { name_ru: { startsWith: search, mode: "insensitive" } },
            { name_uz: { startsWith: search, mode: "insensitive" } },
          ]
        },
        skip: (pageNumber - 1) * limitNumber,
        take: limitNumber,
        include: {
          Tool: true
        }
      })
      return brands
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  async findOne(id: string) {
    try {
      let brand = await this.prisma.brand.findUnique({
        where: { id },
        include: {
          Tool: true
        }
      })
      if (!brand) return new NotFoundException("Not founed")
      return brand
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  async update(id: string, updateBrandDto: UpdateBrandDto) {
    try {
      let updated = await this.prisma.brand.update({
        data: updateBrandDto,
        where: { id }
      })
      return updated
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  async remove(id: string) {
    try {
      let removed = await this.prisma.brand.delete({ where: { id } })
      return removed
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }
}
