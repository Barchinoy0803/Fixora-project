import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LevelService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createLevelDto: CreateLevelDto) {
    try {
      let created = await this.prisma.level.create({ data: createLevelDto })
      return created
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findAll(page = 1, limit = 10, search = '') {
    try {
      const pageNumber = Number(page)
      const limitNumber = Number(limit)
      let levels = await this.prisma.level.findMany({
        where: {
          OR: [
            { name_en: { startsWith: search, mode: "insensitive" } },
            { name_ru: { startsWith: search, mode: "insensitive" } },
            { name_uz: { startsWith: search, mode: "insensitive" } },
          ]
        },
        include: {
          MasterProfession: true,
          ProfessionLevel: true
        },
        skip: (pageNumber - 1) * limitNumber,
        take: limitNumber
      })
      return levels
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findOne(id: string) {
    try {
      let level = await this.prisma.level.findUnique({
        include: {
          MasterProfession: true,
          ProfessionLevel: true
        },
        where: { id }
      })
      if (!level) return new NotFoundException("Not found")
      return level
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async update(id: string, updateLevelDto: UpdateLevelDto) {
    try {
      let updated = await this.prisma.level.update({
        data: updateLevelDto,
        where: { id }
      })
      return updated
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async remove(id: string) {
    try {
      let deleted = await this.prisma.level.delete({ where: { id } })
      return deleted
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}
