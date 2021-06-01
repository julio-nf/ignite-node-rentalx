import { getRepository, Repository } from 'typeorm';

import { Specification } from '../entities/Specification';
import { SpecificationsDTO } from '@modules/cars/dtos/CreateSpecificationDTO';
import { SpecificationRepository } from '@modules/cars/repositories/interfaces/SpecificationRepository';

export class SpecificationsRepository implements SpecificationRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({ name, description }: SpecificationsDTO): Promise<Specification> {
    const specification = this.repository.create({
      name,
      description,
    });

    await this.repository.save(specification);

    return specification;
  }

  async findByName(name: string): Promise<Specification | undefined> {
    const specification = await this.repository.findOne({ name });

    return specification;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specificationsIds = await this.repository.findByIds(ids);

    return specificationsIds;
  }
}
