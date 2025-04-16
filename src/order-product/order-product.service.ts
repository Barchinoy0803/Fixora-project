import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateOrderProductDto } from './dto/create-order-product.dto';
import { UpdateOrderProductDto } from './dto/update-order-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderProductService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createOrderProductDto: CreateOrderProductDto) {
    try {
      let orderProduct = await this.prisma.orderProduct.create({ data: createOrderProductDto })
      return orderProduct
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findAll(page = 1, limit = 10) {
    try {
      const pageNumber = Number(page)
      const limitNumber = Number(limit)

      let orderProducts = await this.prisma.orderProduct.findMany({
        include:
        {
          level: true,
          order: true,
          profession: true,
          tool: true
        },
        skip: (pageNumber - 1) * limitNumber,
        take: limitNumber
      })
      return orderProducts
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findOne(id: string) {
    try {
      let orderProduct = await this.prisma.orderProduct.findUnique({ where: { id } })
      if (!orderProduct) return new NotFoundException("Not found")
      return orderProduct
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async update(id: string, updateOrderProductDto: UpdateOrderProductDto) {
    try {
      let updated = await this.prisma.orderProduct.update({
        data: updateOrderProductDto,
        where: { id }
      })
      return updated
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async remove(id: string) {
    try {
      let deleted = await this.prisma.orderProduct.delete({ where: { id } })
      return deleted
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}
