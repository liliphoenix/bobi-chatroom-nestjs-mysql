import { InjectRepository } from '@nestjs/typeorm';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { notRead } from 'src/auth/entities/notRead.entity';
import { CreateMessageDto } from 'src/message/dto/create-message.dto';
import { Message } from 'src/message/entities/message.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
@WebSocketGateway({ cors: true })
export class EventsGateway {
  sockets: any = {};
  online: any = {};
  Bars: any = {};
  constructor(
    @InjectRepository(Message) private readonly message: Repository<Message>,
    @InjectRepository(notRead) private readonly notread: Repository<notRead>,
    @InjectRepository(User) private readonly user: Repository<User>,
  ) { }

  @SubscribeMessage('other')
  handle(client: Socket, data: any) {
    if (data.username) {
      this.Bars[data.username] = client.id;
      console.log(this.Bars);

    }
  }
  // @SubscribeMessage('friendChat')
  // async friendChating(client: Socket, data: any) {
  //   const chatMsg = {
  //     nickname: data.nickname,
  //     username: data.username,
  //     content: data.content,
  //     toUser: data.toUser,
  //     roomid: `${data.username}${data.toUser}`,
  //     createTime: data.createTime,
  //     avator: data.avator,
  //   };
  //   // 获取的是
  //   const room2 = this.Bars[data.toUser];
  //   const chatObj = this.online[data.toUser];
  //   const room = this.sockets[data.toUser];
  //   client.to(this.sockets[data.username]).emit('getMee', chatMsg);
  //   client.to(room).emit('getMee', chatMsg);
  //   await this.message.save(chatMsg);
  //   if (chatObj !== data.username) {
  //     // 查找数据库
  //     const history = await this.notread
  //       .createQueryBuilder('not_read')
  //       .where('not_read.username=:username', { username: data.toUser })
  //       .andWhere('not_read.from=:from', { from: data.username })
  //       .getOne();
  //     // 数据库中有无数据
  //     if (history !== null) {
  //       // 获得count
  //       history.count++;
  //       // 更新数据库
  //       client
  //         .to(room)
  //         .emit('addone', { username: data.username, count: history.count });
  //       client
  //         .to(room2)
  //         .emit('add', { username: data.username, count: history.count });
  //       await this.notread
  //         .createQueryBuilder()
  //         .update(notRead)
  //         .set({ count: history.count })
  //         .where('username = :username', { username: data.toUser })
  //         .andWhere('not_read.from=:from', { from: data.username })
  //         .execute();
  //       // 即时通讯
  //     } else {
  //       // 添加一条数据
  //       const notReadMsg = {
  //         username: data.toUser,
  //         from: data.username,
  //         count: 1,
  //       };
  //       client.to(room).emit('addone', { username: data.username, count: 1 });
  //       client.to(room2).emit('add', { username: data.username, count: 1 });
  //       await this.notread.save(notReadMsg);
  //       // 即时通讯
  //     }
  //   }
  // }
  @SubscribeMessage('message')
  async getMsg(client: Socket, data: CreateMessageDto) {
    // const res=-this.authService.getUserInfo(data)  @PrimaryGeneratedColumn()

    client.emit('sending', data);
    client.broadcast.emit('sending', data);
    data.roomid = `${data.username}${data.toUser}`;
    await this.message.save(data);
    // toUser是否是room1 如果是room1，socket派发给出自己意外的
    //获取所有会接收到的用户
    if (data.toUser === "room1") {
      const res = await this.user.find();
      const newList = res.filter(
        (item) => item.username !== 'room1' && item.username !== data.username,
      );
      // 遍历所有用户
      console.log(newList);

      newList.forEach(async (element) => {
        // 查看有无历史未读消息
        const history = await this.notread
          .createQueryBuilder('not_read')
          .where('not_read.username=:username', { username: element.username })
          .andWhere('not_read.from=:from', { from: 'room1' })
          .getOne();
        // 如果有的话
        if (history !== null) {
          // 原有基础++
          history.count++;
          // 只能广播给特定的用户
          if (history.username == element.username) {
            client.to(this.Bars[element.username]).emit('notRead', {
              username: 'room1',
              count: history.count,
            });
          }
          // 更新历史数据
          await this.notread
            .createQueryBuilder()
            .update(notRead)
            .set({ count: history.count })
            .where('username = :username', { username: element.username })
            .andWhere('not_read.from=:from', { from: element.username })
            .execute();
        } else {
          // 如果没有就创建一个
          const notReadMsg = {
            username: element.username,
            from: 'room1',
            count: 1,
          };
          client.to(this.Bars[element.username]).emit('notRead', {
            username: element.username,
            count: 1,
          });
          await this.notread.save(notReadMsg);
        }
      });
    } else {

    }
  }
}
