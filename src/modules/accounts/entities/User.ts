import { v4 as uuid } from 'uuid';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  name!: string;

  @Column()
  password!: string;

  @Column()
  email!: string;

  @Column()
  driverLicense!: string;

  @Column({ type: 'boolean', default: 'false' })
  isAdmin!: boolean;

  @Column({ nullable: true })
  avatar!: string;

  @CreateDateColumn()
  createdAt!: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
