import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateMasterDto } from './dto/create-master.dto';
import { UpdateMasterDto } from './dto/update-master.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MasterService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createMasterDto: CreateMasterDto) {
    try {
      let master = await this.prisma.master.create({ data: createMasterDto })
      return master
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findAll(
    page = 1,
    limit = 10,
    search = '',
    from?: number,
    to?: number,
    isActive = '',
    starOrder = 'desc'
  ) {
    try {
      const pageNumber = Number(page);
      const limitNumber = Number(limit);
      const fromYear = Number(from);
      const toYear = Number(to);
  
      const hasFrom = !isNaN(fromYear);
      const hasTo = !isNaN(toYear);
  
      let whereConditions: any = {
        OR: [
          { firstname: { startsWith: search, mode: 'insensitive' } },
          { lastname: { startsWith: search, mode: 'insensitive' } },
          { phoneNumber: { startsWith: search, mode: 'insensitive' } },
        ],
      };
  
      if (hasFrom && hasTo) {
        whereConditions.year = { gte: fromYear, lte: toYear };
      } else if (hasFrom) {
        whereConditions.year = { gte: fromYear };
      }
  
      if (isActive !== '') {
        whereConditions.isActive = isActive === 'true';
      }
  
      const masters = await this.prisma.master.findMany({
        include: {
          MasterProfession: true,
          orderMaster: true,
          Comment: true,
        },
        skip: (pageNumber - 1) * limitNumber,
        take: limitNumber,
        where: whereConditions,
        orderBy: {
          avarageStar: starOrder === 'asc' ? 'asc' : 'desc',
        },
      });
  
      return masters;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  
  async findOne(id: string) {
    try {
      let master = await this.prisma.master.findUnique({
        where: { id },
        include: {
          MasterProfession: true,
          orderMaster: true,
          Comment: true
        }
      })
      if (!master) return new NotFoundException("Not found")
      return master
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async update(id: string, updateMasterDto: UpdateMasterDto) {
    try {
      let updated = await this.prisma.master.update({
        data: updateMasterDto,
        where: { id }
      })
      return updated
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async remove(id: string) {
    try {
      let deleted = await this.prisma.master.delete({ where: { id } })
      return deleted
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}
