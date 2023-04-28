import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: number;
  @Column()
  nickname: string;
  @Column()
  content: string;
  @Column({
    // 名字
    name: 'create_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;
  @Column()
  username: string;
  @Column()
  toUser: string;
  @Column()
  roomid: string;
  @Column({})
  avator: string;
}
