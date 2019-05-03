import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from "typeorm";
import Message from "./Message";

@Entity()
class Chat extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  // 하나의 Chat이 다수의 메세지를 가지고있다 One Chat Many massage
  @OneToMany(type => Message, message => message.chat)
  messages: Message[];

  @CreateDateColumn() createdAt: string;
  @UpdateDateColumn() updatedAt: string;
}

export default Chat;
