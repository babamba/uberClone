import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert
  // ManyToOne
} from "typeorm";
import { verificationTarget } from "../types/types";
// import User from "./User";

const PHONE = "PHONE";
const EMAIL = "EMAIL";

@Entity()
class Verification extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: "enum", enum: [PHONE, EMAIL] })
  target: verificationTarget;

  @Column({ type: "text" })
  payload: string;

  @Column({ type: "text" })
  key: string;

  @Column({ type: "boolean", default: false })
  verified: boolean;

  // @Column({ type: "boolean", default: false })
  // used: boolean;

  // @ManyToOne(type => User, user => user.verification, { nullable: true })
  // user: User;

  @CreateDateColumn() createdAt: string;
  @UpdateDateColumn() updatedAt: string;

  @BeforeInsert()
  createkey(): void {
    if (this.target === PHONE) {
      this.key = Math.floor(Math.random() * 100000).toString();
    } else if (this.target === EMAIL) {
      this.key = Math.random()
        .toString(36)
        .substr(2);
    }
  }
}

export default Verification;
