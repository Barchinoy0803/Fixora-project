import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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

  // async findAll(page = 1, limit = 10, search = '') {
  //   try {
  //     const pageNumber = Number(page)
  //     const limitNumber = Number(limit)

  //     let tools = await this.prisma.tool.findMany({
  //       where: {
  //         OR: [
  //           { name_en: { startsWith: search, mode: "insensitive" } },
  //           { name_ru: { startsWith: search, mode: "insensitive" } },
  //           { name_ru: { startsWith: search, mode: "insensitive" } },
  //         ]
  //       },
  //       skip: (pageNumber - 1) * limitNumber,
  //       take: limitNumber,
  //       include: {
  //         // Basket: true,
  //         brand: true,
  //         capasity: true,
  //         size: true,
  //         ProfessionTool: true
  //       }
  //     })
  //     return tools
  //   } catch (error) {
  //     throw new InternalServerErrorException(error)
  //   }
  // }

  async findAll(
    page = 1,
    limit = 10,
    search = '',
    brandName?: string,
    capasityName?: string,
    sizeName?: string,
    priceFrom?: number,
    priceTo?: number
  ) {
    try {
      const pageNumber = Number(page);
      const limitNumber = Number(limit);

      const whereConditions: any = {
        AND: [],
      };

      if (search) {
        whereConditions.AND.push({
          OR: [
            { name_en: { contains: search, mode: 'insensitive' } },
            { name_ru: { contains: search, mode: 'insensitive' } },
            { name_uz: { contains: search, mode: 'insensitive' } },
          ],
        });
      }

      if (brandName) {
        whereConditions.AND.push({
          OR: [
            { brand: { name_uz: { contains: brandName, mode: "insensitive" } } },
            { brand: { name_ru: { contains: brandName, mode: "insensitive" } } },
            { brand: { name_en: { contains: brandName, mode: "insensitive" } } }
          ]
        });
      }

      if (capasityName) {
        whereConditions.AND.push({
          OR: [
            { capasity: { name_uz: { contains: capasityName, mode: "insensitive" } } },
            { capasity: { name_ru: { contains: capasityName, mode: "insensitive" } } },
            { capasity: { name_en: { contains: capasityName, mode: "insensitive" } } }
          ]
        });
      }

      if (sizeName) {
        whereConditions.AND.push({
          OR: [
            { size: { name_uz: { contains: sizeName, mode: "insensitive" } } },
            { size: { name_ru: { contains: sizeName, mode: "insensitive" } } },
            { size: { name_en: { contains: sizeName, mode: "insensitive" } } }
          ]
        });
      }

      if (priceFrom || priceTo) {
        const priceFilter: any = {};
        if (priceFrom) priceFilter.gte = Number(priceFrom);
        if (priceTo) priceFilter.lte = Number(priceTo);

        whereConditions.AND.push({ price: priceFilter });
      }
 
      const tools = await this.prisma.tool.findMany({
        where: whereConditions,
        skip: (pageNumber - 1) * limitNumber,
        take: limitNumber,
        include: {
          brand: true,
          capasity: true,
          size: true,
          ProfessionTool: true,
        },
      });
      return tools;
    } catch (error) {
      console.log(error);

      throw new BadRequestException(error);
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
