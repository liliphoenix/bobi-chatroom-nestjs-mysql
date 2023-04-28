import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { notRead } from 'src/auth/entities/notRead.entity';
import { RoomChat } from 'src/user/entities/room.entity';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessageService {
  @InjectRepository(Message) private readonly message: Repository<Message>;
  @InjectRepository(RoomChat) private readonly roomChat: Repository<RoomChat>;
  @InjectRepository(notRead) private readonly notread: Repository<notRead>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(_createMessageDto: CreateMessageDto) {
    return 'This action adds a new message';
  }
  async getFriendChat(data) {
    let res
    if (data.toUser === "room1") {
      res = await this.message
        .createQueryBuilder('message')
        .where('message.toUser=:toUser', { toUser: data.toUser })
        .addOrderBy('create_time', 'ASC')
        .getMany()
    } else {
      res = await this.message
        .createQueryBuilder('message')
        .where('message.roomid=:roomid', {
          roomid: `${data.username}${data.toUser}`,
        })
        .orWhere('message.roomid=:roomidd', {
          roomidd: `${data.toUser}${data.username}`,
        })
        .addOrderBy('create_time', 'ASC')
        .getMany();
    }
    return res;
  }
  async findAll() {
    return await this.message
      .createQueryBuilder('user')
      .addOrderBy('create_time', 'ASC')
      .getMany();
  }

  async findOne(data: { roomid: any }) {
    // 创建并且获取房间信息

    const res = await this.roomChat
      .createQueryBuilder('roomChat')
      .where('roomChat.roomid = :roomid', { roomid: data.roomid })
      .getMany();

    if (res.length === 0) {
      const item = {
        roomid: data.roomid,
        content: '你们可以聊天了',
        nickname: '人工智能机器人',
        username: 'robort',
      };
      const newRoom = await this.roomChat
        .createQueryBuilder('roomChat')
        .insert()
        .into(RoomChat)
        .values(item)
        .execute();
      return newRoom;
    }
    return res;
  }
  async getNotRead(data) {
    const res = await this.notread
      .createQueryBuilder('not_read')
      .where('not_read.username=:not_read', { not_read: data.username })
      .getMany();
    return res;
  }
  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  async remove(data) {
    await this.notread
      .createQueryBuilder()
      .delete()
      .from(notRead)
      .where('not_read.username=:username', { username: data.username })
      .andWhere('not_read.from=:from', { from: data.from })
      .execute();
  }
}
