import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProfessionDto } from './dto/create-profession.dto';
import { UpdateProfessionDto } from './dto/update-profession.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProfessionService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createProfessionDto: CreateProfessionDto) {
    try {
      let profession = await this.prisma.profession.create({ data: createProfessionDto })
      return profession
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findAll(page = 1, limit = 10, search = '', isActive = '') {
    try {
      const pageNumber = Number(page)
      const limitNumber = Number(limit)

      let whereConditions: any = {
        OR: [
          { name_en: { startsWith: search, mode: 'insensitive' } },
          { name_ru: { startsWith: search, mode: 'insensitive' } },
          { name_uz: { startsWith: search, mode: 'insensitive' } },
        ]
      }

      if (isActive != '') {
        let isAct = isActive == 'true' ? true : false
        whereConditions = {
          ...whereConditions,
          isActive: isAct
        }
      }

      let professions = await this.prisma.profession.findMany({
        include: {
          MasterProfession: true,
          ProfessionLevel: true,
          ProfessionTool: true,
          // Basket: true
        },
        where: whereConditions,
        skip: (pageNumber - 1) * limitNumber,
        take: limitNumber
      })
      return professions
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findOne(id: string) {
    try {
      let profession = await this.prisma.profession.findUnique({
        where: { id },
        include: {
          MasterProfession: true,
          ProfessionLevel: true,
          ProfessionTool: true,
          // Basket: true
        }
      })
      if (!profession) return new NotFoundException("Not found")
      return profession
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async update(id: string, updateProfessionDto: UpdateProfessionDto) {
    try {
      let updated = await this.prisma.profession.update({
        data: updateProfessionDto,
        where: { id }
      })
      return updated
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async remove(id: string) {
    try {
      let deleted = await this.prisma.profession.delete({ where: { id } })
      return deleted
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}
