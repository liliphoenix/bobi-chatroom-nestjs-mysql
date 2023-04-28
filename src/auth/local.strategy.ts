import { HttpException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { IStrategyOptions, Strategy } from 'passport-local';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectRepository(User) private readonly user: Repository<User>) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    } as IStrategyOptions);
  }
  async validate(username: string, password: string) {
    const res = await this.user
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.username=:username', { username })
      .getOne();

    if (!res) {
      throw new HttpException('用户名不存在', 404);
    }
    if (password !== res.password) {
      throw new HttpException('密码不正确', 403);
    }
    return res;
  }
}
