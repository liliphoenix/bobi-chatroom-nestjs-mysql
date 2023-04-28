import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;
  @Column()
  username: string;
  @Column({ select: false })
  password: string;
  @Column()
  nickname: string;
  // 角色权限
  @Column('simple-enum', { enum: ['root', 'author', 'visitor'] })
  role: string;
  @Column()
  mobile: string;
  @Column('varchar')
  avator: string;
  @Column({
    // 名字
    name: 'create_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;
  @Column({
    // 名字
    name: 'update_time',
    type: 'timestamp',
    default: () => 'ON UPDATE CURRENT_TIMESTAMP',
  })
  updateTime: Date;
}
