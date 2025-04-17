import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ORDER_STATUS } from '@prisma/client';
import { Request } from 'express';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createOrderDto: CreateOrderDto, req: Request) {
    try {
      let user = req['user']
      console.log(user);

      let { orderItems, ...rest } = createOrderDto
      rest.date = new Date(rest.date)

      let order = await this.prisma.order.create({
        data: {
          ...rest,
          user: {
            connect: { id: user.id }
          },
          OrderProduct: {
            create: orderItems
          }
        },
        include: { OrderProduct: true }
      })
      return { data: order }
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async findAll(page = 1, limit = 10) {
    try {
      const pageNumber = Number(page)
      const limitNumber = Number(limit)

      let orders = await this.prisma.order.findMany({
        include: { orderMaster: true, user: true },
        skip: (pageNumber - 1) * limitNumber,
        take: limitNumber
      })
      return orders
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findOne(id: string) {
    try {
      let order = await this.prisma.order.findUnique({ where: { id } })
      if (!order) return new NotFoundException("Not found")
      return order
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    try {
      let updated = await this.prisma.order.update({
        data: updateOrderDto,
        where: { id }
      })
      return updated
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async remove(id: string) {
    try {
      let deleted = await this.prisma.order.delete({ where: { id } })
      return deleted
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}
