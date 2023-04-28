import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@InjectRepository(User) private readonly user: Repository<User>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'process.env.SECRET',
        });
    }
    async validate(payload: any) {
        return { username: payload.username, password: payload.password };
    }
}
