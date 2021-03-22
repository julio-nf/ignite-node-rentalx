import { v4 as uuid } from 'uuid';

export class Category {
  id?: string;

  name!: string;

  description!: string;

  createdAt!: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
