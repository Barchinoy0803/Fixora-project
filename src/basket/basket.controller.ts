import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, UseGuards } from '@nestjs/common';
import { BasketService } from './basket.service';
import { CreateBasketDto } from './dto/create-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { Request } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) { }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createBasketDto: CreateBasketDto, @Req() req: Request) {
    return this.basketService.create(createBasketDto, req);
  }

  @Get()
  findAll(@Query() query: { page?: number, limit?: number }) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    return this.basketService.findAll(page, limit);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.basketService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBasketDto: UpdateBasketDto) {
    return this.basketService.update(id, updateBasketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.basketService.remove(id);
  }
}
