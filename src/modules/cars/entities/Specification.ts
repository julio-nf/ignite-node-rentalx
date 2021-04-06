import { v4 as uuid } from 'uuid';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('specifications')
export class Specification {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @CreateDateColumn()
  createdAt!: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
