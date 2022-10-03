import {
    BaseEntity,
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import * as bcrypt from 'bcrypt';
  import { UserRoles } from './user.enum';
  
  @Entity("users")
  export class Users extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
  
    @Column({
      unique: true,
    })
    email: string;
  
    @Column()
    password: string;

    @Column()
    age: number;

    @Column()
    adress: string;

    @Column()
    photo: string;
  
    @Column({ type: 'enum', enum: UserRoles, default: UserRoles.MEMBER })
    role: UserRoles;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @BeforeInsert()
    async setPassword(password: string) {
      this.password = await bcrypt.hash(password || this.password, 10);
    }
  }

