import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class CommentService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async create(createCommentDto: CreateCommentDto, req: Request) {
    try {
      let user = req['user']
      const { masterId, star } = createCommentDto;
      const master = await this.prisma.master.findUnique({ where: { id: masterId }, include: { Comment: true } })
      
      const avgStar = ((master?.Comment.reduce((sum, comment) => sum + Number(comment.star), 0) ?? 0) + star) / ((master?.Comment.length ?? 0 )+ 1)
      
      await this.prisma.master.update({ data: { avarageStar: avgStar .toFixed(1)}, where: { id: masterId } })
      let comment = await this.prisma.comment.create({ data: { ...createCommentDto, userId: user.id } })
      return comment
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async findAll(page = 1, limit = 10) {
    try {
      const pageNumber = Number(page)
      const limitNumber = Number(limit)

      let comments = await this.prisma.comment.findMany({
        skip: (pageNumber - 1) * limitNumber,
        take: limitNumber,
        include: {
          master: true,
          user: true,
        }
      })
      return comments
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async findOne(id: string) {
    try {
      let comment = await this.prisma.comment.findUnique({ where: { id } })
      if (!comment) return new NotFoundException("Not found")
      return comment
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    try {
      let updated = await this.prisma.comment.update({
        data: updateCommentDto,
        where: { id }
      })
      return { data: updated }
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async remove(id: string) {
    try {
      let removed = await this.prisma.comment.delete({ where: { id } })
      return removed
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}
