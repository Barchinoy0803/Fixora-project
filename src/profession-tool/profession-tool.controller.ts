import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProfessionToolService } from './profession-tool.service';
import { CreateProfessionToolDto } from './dto/create-profession-tool.dto';
import { UpdateProfessionToolDto } from './dto/update-profession-tool.dto';

@Controller('profession-tool')
export class ProfessionToolController {
  constructor(private readonly professionToolService: ProfessionToolService) { }

  @Post()
  create(@Body() createProfessionToolDto: CreateProfessionToolDto) {
    return this.professionToolService.create(createProfessionToolDto);
  }

  @Get()
  findAll(@Query() query: { page?: number, limit?: number }) {
    const page = Number(query.page) || 1
    const limit = Number(query.limit) || 10
    return this.professionToolService.findAll(page, limit);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.professionToolService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfessionToolDto: UpdateProfessionToolDto) {
    return this.professionToolService.update(id, updateProfessionToolDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.professionToolService.remove(id);
  }
}
