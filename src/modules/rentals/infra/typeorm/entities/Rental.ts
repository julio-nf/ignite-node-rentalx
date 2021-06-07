import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

@Entity('rentals')
export class Rental {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ name: 'car_id', type: 'uuid' })
  @ManyToOne(() => Car, { onDelete: 'SET NULL', onUpdate: 'SET NULL' })
  @JoinColumn({ name: 'car_id' })
  carId!: string;

  @Column({ name: 'user_id', type: 'uuid' })
  @ManyToOne(() => User, { onDelete: 'SET NULL', onUpdate: 'SET NULL' })
  @JoinColumn({ name: 'user_id' })
  userId!: string;

  @CreateDateColumn({ name: 'start_date' })
  startDate!: Date;

  @Column({ name: 'end_date', nullable: true })
  endDate!: Date;

  @Column({ name: 'expected_return_date' })
  expectedReturnDate!: Date;

  @Column({ nullable: true })
  total!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
