import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RegionService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createRegionDto: CreateRegionDto) {
    try {
      let region = await this.prisma.region.create({ data: createRegionDto })
      return region
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findAll(page = 1, limit = 10, search = '') {
    try {
      const pageNumber = Number(page)
      const limitNumber = Number(limit)

      let regions = await this.prisma.region.findMany({
        include: { User: true },
        where: {
          OR: [
            { name_en: { startsWith: search, mode: "insensitive" } },
            { name_ru: { startsWith: search, mode: "insensitive" } },
            { name_uz: { startsWith: search, mode: "insensitive" } },
          ]
        },
        skip: (pageNumber - 1) * limitNumber,
        take: limitNumber
      })
      return regions
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findOne(id: string) {
    try {
      let region = await this.prisma.region.findUnique({ where: { id } })
      if (!region) return new NotFoundException("Not found")
      return region
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async update(id: string, updateRegionDto: UpdateRegionDto) {
    try {
      let updated = await this.prisma.region.update({
        data: updateRegionDto,
        where: { id }
      })
      return updated
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async remove(id: string) {
    try {
      let removed = await this.prisma.region.delete({ where: { id } })
      return removed
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}
