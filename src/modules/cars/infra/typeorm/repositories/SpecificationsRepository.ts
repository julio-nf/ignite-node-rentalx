import { getRepository, Repository } from 'typeorm';

import { Specification } from '../entities/Specification';
import {
  Specifications,
  SpecificationsDTO,
} from '@modules/cars/repositories/interfaces/Specifications';

export class SpecificationsRepository implements Specifications {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({ name, description }: SpecificationsDTO) {
    const specification = this.repository.create({
      name,
      description,
    });

    await this.repository.save(specification);
  }

  async findByName(name: string) {
    return !!(await this.repository.findOne({ name }));
  }
}
