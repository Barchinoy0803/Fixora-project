import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AboutUsService } from './about_us.service';
import { CreateAboutUsDto } from './dto/create-about_us.dto';
import { UpdateAboutUsDto } from './dto/update-about_us.dto';

@Controller('about-us')
export class AboutUsController {
  constructor(private readonly aboutUsService: AboutUsService) {}

  @Post()
  create(@Body() createAboutUsDto: CreateAboutUsDto) {
    return this.aboutUsService.create(createAboutUsDto);
  }

  @Get()
  findAll(@Query() query: { page?: number, limit?: number, search?: string }) {
    const page = Number(query.page) || 1
    const limit = Number(query.limit) || 10
    const search = query.search || ''
    return this.aboutUsService.findAll(page, limit, search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aboutUsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAboutUsDto: UpdateAboutUsDto) {
    return this.aboutUsService.update(id, updateAboutUsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aboutUsService.remove(id);
  }
}
