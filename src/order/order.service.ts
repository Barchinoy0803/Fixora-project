import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ORDER_STATUS } from '@prisma/client';
import { Request } from 'express';
import { TelegramService } from 'src/telegram/telegram.service';

@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly telegramService: TelegramService
  ) { }

  async create(createOrderDto: CreateOrderDto, req: Request) {
    try {
      let user = req['user']

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

      await this.telegramService.sendMessage(`Order created ✅\nUser: ${user.id}\nOrder: ${order.id}`)
      return { data: order }
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async findAll(page = 1, limit = 10, status?: ORDER_STATUS) {
    try {
      const pageNumber = Number(page)
      const limitNumber = Number(limit)

      let whereConditions: any = {}

      if (status !== undefined) {
        whereConditions.status = status
      }

      let orders = await this.prisma.order.findMany({
        include: {
          orderMaster: true,
          user: true,
          OrderProduct: true
        },
        skip: (pageNumber - 1) * limitNumber,
        take: limitNumber,
        where: whereConditions
      })
      return orders
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findOne(id: string) {
    try {
      let order = await this.prisma.order.findUnique({
        where: { id },
        include: {
          orderMaster: true,
          user: true,
          OrderProduct: true
        }
      })
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
