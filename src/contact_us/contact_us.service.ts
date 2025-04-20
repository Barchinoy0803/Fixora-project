import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateContactUsDto } from './dto/create-contact_us.dto';
import { UpdateContactUsDto } from './dto/update-contact_us.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ContactUsService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createContactUsDto: CreateContactUsDto) {
    try {
      let created = await this.prisma.contact_Us.create({ data: createContactUsDto })
      return created
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findAll(page = 1, limit = 10, search = '') {
    try {
      const pageNumber = Number(page)
      const limitNumber = Number(limit)

      let findAll = await this.prisma.contact_Us.findMany({
        where: {
          OR: [
            { firstname: { startsWith: search, mode: "insensitive" } },
            { lastname: { startsWith: search, mode: "insensitive" } }
          ]
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
      let findOne = await this.prisma.contact_Us.findUnique({ where: { id } })
      if (!findOne) return new NotFoundException("Not found")
      return findOne
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async update(id: string, updateontactUsDto: UpdateContactUsDto) {
    try {
      let updated = await this.prisma.contact_Us.update({
        data: updateontactUsDto,
        where: { id }
      })
      return updated
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async remove(id: string) {
    try {
      let deleted = await this.prisma.contact_Us.delete({ where: { id } })
      return deleted
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}
