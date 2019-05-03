import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from "typeorm";
import Chat from "./Chat";
import User from "./User";

@Entity()
class Message extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: "text" })
  text: string;

  @ManyToOne(type => User, user => user.messages)
  user: User;

  // 다수의 메시지가 하나의 Chat을 가지고있다 Many massage One Chat
  @ManyToOne(type => Chat, chat => chat.messages)
  chat: Chat;

  @CreateDateColumn() createdAt: string;
  @UpdateDateColumn() updatedAt: string;
}

export default Message;
