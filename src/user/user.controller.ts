import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }
  @Post()
  regist(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }
  @Post('check')
  check(@Body() data) {
    return this.userService.check(data);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  // @Post('uploads')
  // @UseInterceptors(FileInterceptor('file'))
  // upload(@UploadedFile() file) {
  //   file.url = `http://localhost:3006/uploads/${file.filename}`;
  //   return file;
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
  @Post('Info')
  up(@Body() data) {

    return this.userService.changeInfo(data);
  }
  @Put()
  changeInfo(@Body() data) {

    return this.userService.changeUserInfo(data);
  }
}
