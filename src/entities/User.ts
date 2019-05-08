import { IsEmail } from "class-validator";
import bcrypt from "bcrypt-nodejs";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne,
  OneToMany
} from "typeorm";
import Chat from "./Chat";
import Message from "./Message";
// import Verification from "./Verification";
import Ride from "./Ride";
import Place from "./Place";

const BCRYPT_ROUNDS = 10;

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: "varchar", nullable: true })
  @IsEmail()
  email: string | null;

  @Column({ type: "boolean", default: false })
  verifiedEmail: boolean;

  @Column({ type: "text" })
  firstName: string;

  @Column({ type: "text" })
  lastName: string;

  @Column({ type: "int", nullable: true })
  age: number;

  @Column({ type: "text", nullable: true })
  password: string;

  @Column({ type: "text", nullable: true })
  phoneNumber: string;

  @Column({ type: "boolean", default: false })
  verifiedPhoneNumber: boolean;

  @Column({ type: "text" })
  profilePhoto: string;

  @Column({ type: "boolean", default: false })
  isDriving: boolean;

  @Column({ type: "boolean", default: false })
  isRiding: boolean;

  @Column({ type: "boolean", default: false })
  isTaken: boolean;

  @Column({ type: "double precision", default: 0 })
  lastLng: number;

  @Column({ type: "double precision", default: 0 })
  lastLat: number;

  @Column({ type: "double precision", default: 0 })
  lastOrientation: number;

  @Column({ type: "text", nullable: true })
  fbId: string;

  @ManyToOne(type => Chat, chat => chat.participants)
  chat: Chat[];

  @OneToMany(type => Message, message => message.user)
  messages: Message[];

  // @OneToMany(type => Verification, verification => verification.user)
  // verification: Verification[];

  @OneToMany(type => Ride, ride => ride.passenger)
  rideAsPassenger: Ride[];

  @OneToMany(type => Ride, ride => ride.driver)
  rideAsDriver: Ride[];

  @OneToMany(type => Place, place => place.user)
  places: Place[];

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  public comparePassword(password: string): Promise<boolean> {
    const userPassword = this.password;
    return new Promise(function(resolve, reject) {
      const result = bcrypt.compareSync(password, userPassword);
      resolve(result);
    });
  }

  @CreateDateColumn() createdAt: string;
  @UpdateDateColumn() updatedAt: string;

  // save 하거나 update 하기전에 호출되는 메소드
  @BeforeInsert()
  @BeforeUpdate()
  async savePassword(): Promise<void> {
    if (this.password) {
      const hashedPassword = await this.hashPassword(this.password);
      this.password = hashedPassword;
    }
  }

  private hashPassword(password: string): Promise<string> {
    //BCRYPT_ROUNDS 만큼 hash한다
    const salt = bcrypt.genSaltSync(BCRYPT_ROUNDS);
    return new Promise(function(resolve, reject) {
      const hashedPassword = bcrypt.hashSync(password, salt);
      if (hashedPassword) {
        resolve(hashedPassword);
      }
      reject(new Error("Hashed Failed"));
    });
  }
}

export default User;
