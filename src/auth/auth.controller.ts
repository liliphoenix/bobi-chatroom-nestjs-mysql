import {
  Controller,
  Req,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Auth } from './entities/auth.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @UseInterceptors(ClassSerializerInterceptor)
  create(@Body() user: CreateAuthDto) {

    return this.authService.createToken(user);
  }
  // 获取用户信息
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  @UseInterceptors(ClassSerializerInterceptor)
  getUser(@Req() req) {
    return this.authService.getUserInfo(req.user);
  }
  // 获取用户列表
  @UseGuards(AuthGuard('jwt'))
  @Get(':offset/:limit')
  @UseInterceptors(ClassSerializerInterceptor)
  getUserList(@Param('offset') offset, @Param('limit') limit) {

    return this.authService.getList(offset, limit);
  }
}
