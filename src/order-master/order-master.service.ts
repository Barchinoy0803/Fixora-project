import { Injectable } from '@nestjs/common';
import { CreateOrderMasterDto } from './dto/create-order-master.dto';
import { UpdateOrderMasterDto } from './dto/update-order-master.dto';

@Injectable()
export class OrderMasterService {
  create(createOrderMasterDto: CreateOrderMasterDto) {
    return 'This action adds a new orderMaster';
  }

  findAll() {
    return `This action returns all orderMaster`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderMaster`;
  }

  update(id: number, updateOrderMasterDto: UpdateOrderMasterDto) {
    return `This action updates a #${id} orderMaster`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderMaster`;
  }
}
