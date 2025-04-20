import {
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { CloudinaryService } from 'nestjs-cloudinary';
  import {
    ApiBody,
    ApiConsumes,
    ApiOperation,
    ApiResponse,
    ApiTags,
  } from '@nestjs/swagger';
  import { ApiProperty } from '@nestjs/swagger';
  import { Express } from 'express';
  
  class UploadFileDto {
    @ApiProperty({ type: 'string', format: 'binary' })
    file: Express.Multer.File;
  }
  
  @ApiTags('File Upload')
  @Controller('file-upload')
  export class FileUploadController {
    constructor(private readonly cloudinaryService: CloudinaryService) {}
  
    @Post()
    @ApiOperation({ summary: 'Upload a file to Cloudinary' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
      description: 'File to upload',
      type: UploadFileDto,
    })
    @ApiResponse({ status: 201, description: 'File uploaded successfully', schema: {
      example: {
        url: 'https://res.cloudinary.com/demo/image/upload/v1234567890/sample.jpg'
      }
    }})
    @UseInterceptors(FileInterceptor('file'))
    async create(@UploadedFile() file: Express.Multer.File) {
      const { url } = await this.cloudinaryService.uploadFile(file);
      return { url };
    }
  }
  