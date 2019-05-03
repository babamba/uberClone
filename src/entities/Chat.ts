import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from "typeorm";
import Message from "./Message";
import User from "./User";

@Entity()
class Chat extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  // 하나의 Chat이 다수의 메세지를 가지고있다 One Chat Many massage
  @OneToMany(type => Message, message => message.chat)
  messages: Message[];

  @OneToMany(type => User, user => user.chat)
  participants: User[];

  @CreateDateColumn() createdAt: string;
  @UpdateDateColumn() updatedAt: string;
}

export default Chat;
