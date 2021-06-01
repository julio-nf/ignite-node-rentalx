import { SpecificationRepository } from '../interfaces/SpecificationRepository';
import { SpecificationsDTO } from '@modules/cars/dtos/CreateSpecificationDTO';
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';

export class SpecificationsRepositoryInMemory implements SpecificationRepository {
  specifications: Specification[] = [];

  async create({ name, description }: SpecificationsDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
    });

    this.specifications.push(specification);

    return specification;
  }

  async findByName(name: string): Promise<Specification | undefined> {
    const specification = this.specifications.find((s) => s.name === name);

    return specification;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const allSpecifications = this.specifications.filter((s) => ids.includes(String(s.id)));

    return allSpecifications;
  }
}
