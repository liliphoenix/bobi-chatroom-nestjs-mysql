import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Message } from 'src/message/entities/message.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
    @InjectRepository(Message) private readonly message: Repository<Message>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const res = await this.user
      .createQueryBuilder('user')
      .where('user.username=:username', { username: createUserDto.username })
      .orWhere('user.mobile=:mobile', { mobile: createUserDto.mobile })
      .getOne();
    if (res) {
      const isUsername = await this.user
        .createQueryBuilder('user')
        .where('user.username=:username', { username: createUserDto.username })
        .getOne();
      if (isUsername) {
        throw new HttpException('该用户名已被注册', 404);
      }
      throw new HttpException('该手机号已被注册', 404);
    }
    const newUser = new User();
    newUser.username = createUserDto.username;
    newUser.nickname = createUserDto.nickname;
    newUser.password = createUserDto.password;
    newUser.mobile = createUserDto.mobile;
    newUser.avator = createUserDto.avator;
    await this.user.save(newUser);
    return await this.user.findOne({
      where: { username: createUserDto.username },
    });
  }

  async findAll() {
    const res = await this.user.find();
    return res;
  }
  async check(data) {
    const res = await this.user
      .createQueryBuilder('user')
      .where('user.username=:username', { username: data.username })
      .getOne();
    if (res) {
      throw new HttpException('用户名已存在', 404);
    }
  }
  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  changeInfo(data) {
    this.user
      .createQueryBuilder()
      .update(User)
      .set({ avator: data.url })
      .where('username=:username', { username: data.username })
      .execute();
    this.message
      .createQueryBuilder()
      .update(Message)
      .set({ avator: data.url })
      .where('username=:username', { username: data.username })
      .execute();
  }
  changeUserInfo(data) {
    this.user
      .createQueryBuilder()
      .update(User)
      .set({ nickname: data.nickname, mobile: data.mobile })
      .where('username=:username', { username: data.username })
      .execute();
  }
}
