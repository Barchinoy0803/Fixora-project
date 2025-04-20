import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBasketDto } from './dto/create-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class BasketService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createBasketDto: CreateBasketDto, req: Request) {
    try {
      let user = req['user']
      
      let basket = await this.prisma.basket.create({ data: { ...createBasketDto, userId: user.id } })
      return basket
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async findAll(page = 1, limit = 10) {
    try {
      const pageNumber = Number(page)
      const limitNumber = Number(limit)

      let basketItems = await this.prisma.basket.findMany({
        include: {
          level: true,
          profession: true,
          tool: true,
        },
        skip: (pageNumber - 1) * limitNumber,
        take: limitNumber
      })
      return basketItems
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async findOne(id: string) {
    try {
      let basketItem = await this.prisma.basket.findUnique({ where: { id } })
      if (!basketItem) return new NotFoundException("Not found")
      return basketItem
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async update(id: string, updateBasketDto: UpdateBasketDto) {
    try {
      
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async remove(id: string) {
    try {

    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}
