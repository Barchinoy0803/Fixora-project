import { Injectable } from '@nestjs/common';
import { CreateCapasityDto } from './dto/create-capasity.dto';
import { UpdateCapasityDto } from './dto/update-capasity.dto';

@Injectable()
export class CapasityService {
  create(createCapasityDto: CreateCapasityDto) {
    return 'This action adds a new capasity';
  }

  findAll() {
    return `This action returns all capasity`;
  }

  findOne(id: number) {
    return `This action returns a #${id} capasity`;
  }

  update(id: number, updateCapasityDto: UpdateCapasityDto) {
    return `This action updates a #${id} capasity`;
  }

  remove(id: number) {
    return `This action removes a #${id} capasity`;
  }
}
