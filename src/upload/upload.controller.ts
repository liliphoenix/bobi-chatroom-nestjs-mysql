import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { join } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { UpdateUploadDto } from './dto/update-upload.dto';
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) { }

  @Post('tu')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file) {
    return file;
  }
  @Get()
  findAll() {
    return this.uploadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {


    return this.uploadService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUploadDto: UpdateUploadDto) {
    return this.uploadService.update(+id, updateUploadDto);
  }

  @Delete()
  remove() {

  }
}
