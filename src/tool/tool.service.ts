import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateToolDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ToolService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createToolDto: CreateToolDto) {
    try {
      let tool = await this.prisma.tool.create({ data: createToolDto })
      return tool
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error)
    }
  }

  async findAll(page = 1, limit = 10, search = '') {
    try {
      const pageNumber = Number(page)
      const limitNumber = Number(limit)

      let tools = await this.prisma.tool.findMany({
        where: {
          OR: [
            { name_en: { startsWith: search } },
            { name_ru: { startsWith: search } },
            { name_ru: { startsWith: search } },
          ]
        },
        skip: (pageNumber - 1) * limitNumber,
        take: limitNumber
      })
      return tools
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findOne(id: string) {
    try {
      let tool = await this.prisma.tool.findUnique({ where: { id } })
      if (!tool) return new NotFoundException("Not found")
      return tool
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async update(id: string, updateToolDto: UpdateToolDto) {
    try {
      let updated = await this.prisma.tool.update({
        data: updateToolDto,
        where: { id }
      })
      return updated
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async remove(id: string) {
    try {
      let deleted = await this.prisma.tool.delete({ where: { id } })
      return deleted
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}
