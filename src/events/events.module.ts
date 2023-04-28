import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { notRead } from 'src/auth/entities/notRead.entity';
import { Message } from 'src/message/entities/message.entity';
import { RoomChat } from 'src/user/entities/room.entity';
import { User } from 'src/user/entities/user.entity';
import { EventsGateway } from './events.gateway';
@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Message, RoomChat, notRead, User]),
  ],
  providers: [EventsGateway],
})
export class EventsModule {}
