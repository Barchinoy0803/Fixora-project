import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ShowcaseService } from './showcase.service';
import { CreateShowcaseDto } from './dto/create-showcase.dto';
import { UpdateShowcaseDto } from './dto/update-showcase.dto';

@Controller('showcase')   
export class ShowcaseController {
  constructor(private readonly showcaseService: ShowcaseService) { }

  @Post()
  create(@Body() createShowcaseDto: CreateShowcaseDto) {
    return this.showcaseService.create(createShowcaseDto);
  }

  @Get()  
  findAll(@Query() query: { page?: number, limit?: number, search?: string }) {
    const page = Number(query.page) || 1
    const limit = Number(query.limit) || 10
    const search = query.search || ''
    return this.showcaseService.findAll(page, limit, search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.showcaseService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShowcaseDto: UpdateShowcaseDto) {
    return this.showcaseService.update(id, updateShowcaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.showcaseService.remove(id);
  }
}
