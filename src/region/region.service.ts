import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RegionService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createRegionDto: CreateRegionDto) {
    try {
      let region = await this.prisma.region.create({ data: createRegionDto })
      return region
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findAll() {
    try {
      let regions = await this.prisma.region.findMany({
        include: {User: true},
        
      })
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findOne(id: string) {
    try {

    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async update(id: string, updateRegionDto: UpdateRegionDto) {
    try {

    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async remove(id: string) {
    try {

    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}
