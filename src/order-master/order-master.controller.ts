import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OrderMasterService } from './order-master.service';
import { CreateOrderMasterDto } from './dto/create-order-master.dto';
import { UpdateOrderMasterDto } from './dto/update-order-master.dto';

@Controller('order-master')
export class OrderMasterController {
  constructor(private readonly orderMasterService: OrderMasterService) { }

  @Post()
  create(@Body() createOrderMasterDto: CreateOrderMasterDto) {
    return this.orderMasterService.create(createOrderMasterDto);
  }
  
  @Get()
  findAll(@Query() query: { page?: number, limit?: number }) {
    const page = Number(query.page) || 1
    const limit = Number(query.limit) || 10
    return this.orderMasterService.findAll(page, limit);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderMasterService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderMasterDto: UpdateOrderMasterDto) {
    return this.orderMasterService.update(id, updateOrderMasterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderMasterService.remove(id);
  }
}
