import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RoomChat {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    roomid: string
    @Column()
    content: string
    @Column()
    nickname: string
    @Column()
    username: string
}
