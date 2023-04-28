import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { User } from 'src/user/entities/user.entity';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
const jwtModule = JwtModule.register({
  secret: 'process.env.SECRET',
  signOptions: { expiresIn: '4h' },
});
@Module({
  imports: [TypeOrmModule.forFeature([User]), PassportModule, jwtModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule { }
