import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Car } from './Car';

@Entity('cars_images')
export class CarImages {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ name: 'car_id' })
  @ManyToOne(() => Car, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'car_id' })
  carId!: string;

  @Column({ name: 'image_name' })
  imageName!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
