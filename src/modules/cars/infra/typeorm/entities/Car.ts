import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Category } from './Category';
import { Specification } from './Specification';

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

  @ManyToMany(() => Specification)
  @JoinTable({
    name: 'specifications_cars',
    joinColumns: [{ name: 'car_id' }],
    inverseJoinColumns: [{ name: 'specification_id' }],
  })
  specifications!: Specification[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
      this.available = true;
    }
  }
}
