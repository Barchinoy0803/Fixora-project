import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ContactUsService } from './contact_us.service';
import { CreateContactUsDto } from './dto/create-contact_us.dto';
import { UpdateContactUsDto } from './dto/update-contact_us.dto';

@Controller('contact-us')
export class ContactUsController {
  constructor(private readonly contactUsService: ContactUsService) {}

  @Post()
  create(@Body() createContactUsDto: CreateContactUsDto) {
    return this.contactUsService.create(createContactUsDto);
  }

  @Get()
  findAll(@Query() query: { page?: number, limit?: number, search?: string }) {
    const page = Number(query.page) || 1
    const limit = Number(query.limit) || 10
    const search = query.search || ''
    return this.contactUsService.findAll(page, limit, search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactUsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContactUsDto: UpdateContactUsDto) {
    return this.contactUsService.update(id, updateContactUsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactUsService.remove(id);
  }
}
