import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

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

  @Column({ name: 'driver_license' })
  driverLicense!: string;

  @Column({ name: 'is_admin', type: 'boolean', default: 'false' })
  isAdmin!: boolean;

  @Column({ nullable: true })
  avatar!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
