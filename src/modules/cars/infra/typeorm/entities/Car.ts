import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Category } from './Category';

@Entity('cars')
export class Car {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column({ name: 'daily_rate' })
  dailyRate!: number;

  @Column({ default: true })
  available!: boolean;

  @Column({ name: 'license_plate' })
  licensePlate!: string;

  @Column({ name: 'fine_amount' })
  fineAmount!: number;

  @Column()
  brand!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @ManyToOne(() => Category, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'category_id' })
  category!: Category;

  @Column({ name: 'category_id', nullable: true })
  categoryId!: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
