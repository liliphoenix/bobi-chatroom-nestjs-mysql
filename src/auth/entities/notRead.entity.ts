import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class notRead {
  @PrimaryGeneratedColumn("uuid")
  id: number
  @Column()
  from: string
  @Column()
  count: number
  @Column()
  username: string
}