import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { RoomChat } from 'src/user/entities/room.entity';
import { notRead } from 'src/auth/entities/notRead.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message, RoomChat, notRead])],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
