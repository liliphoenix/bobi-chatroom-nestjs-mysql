import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMessageDto } from 'src/message/dto/create-message.dto';
import { Message } from 'src/message/entities/message.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
    private jwtservice: JwtService,
  ) { }
  createToken(user: CreateAuthDto) {

    const token = this.jwtservice.sign({
      username: user.username,
      password: user.password,
    });
    return { token };
  }
  async getUserInfo(data) {
    return await this.user
      .createQueryBuilder('user')
      .where('user.username=:username', { username: data.username })
      .getOne();
  }
  async getList(offset, limit) {
    return await this.user
      .createQueryBuilder('user')
      .offset(offset * limit)
      .limit(limit)
      .addOrderBy('mobile', 'ASC')
      .getMany();
  }
}
