import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProfessionLevelService } from './profession-level.service';
import { CreateProfessionLevelDto } from './dto/create-profession-level.dto';
import { UpdateProfessionLevelDto } from './dto/update-profession-level.dto';

@Controller('profession-level')
export class ProfessionLevelController {
  constructor(private readonly professionLevelService: ProfessionLevelService) {}

  @Post()
  create(@Body() createProfessionLevelDto: CreateProfessionLevelDto) {
    return this.professionLevelService.create(createProfessionLevelDto);
  }

  @Get()
  findAll(@Query() query: { page?: number, limit?: number}) {
    const page = Number(query.page) || 1
    const limit = Number(query.limit) || 10
    return this.professionLevelService.findAll(page, limit);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.professionLevelService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfessionLevelDto: UpdateProfessionLevelDto) {
    return this.professionLevelService.update(id, updateProfessionLevelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.professionLevelService.remove(id);
  }
}
