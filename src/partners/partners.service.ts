import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PartnersService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createPartnerDto: CreatePartnerDto) {
    try {
      let created = await this.prisma.partners.create({ data: createPartnerDto })
      return created
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findAll(page = 1, limit = 10, search = '') {
    try {
      const pageNumber = Number(page)
      const limitNumber = Number(limit)
      let partners = await this.prisma.partners.findMany({
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
      return partners
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findOne(id: string) {
    try {
      let partner = await this.prisma.partners.findUnique({ where: { id } })
      if (!partner) return new NotFoundException("Not found")
      return partner
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async update(id: string, updatePartnerDto: UpdatePartnerDto) {
    try {
      let updated = await this.prisma.partners.update({
        data: updatePartnerDto,
        where: { id }
      })
      return updated
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async remove(id: string) {
    try {
      let deleted = await this.prisma.partners.delete({ where: { id } })
      return deleted
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}
