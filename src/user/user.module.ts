import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { User } from './entities/user.entity';
import { Message } from 'src/message/entities/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Message])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
