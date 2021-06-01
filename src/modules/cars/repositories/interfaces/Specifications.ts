import { SpecificationsDTO } from '@modules/cars/dtos/CreateSpecificationDTO';
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';

export interface Specifications {
  create({ name, description }: SpecificationsDTO): Promise<Specification>;
  findByName(name: string): Promise<Specification | undefined>;
  findByIds(ids: string[]): Promise<Specification[]>;
}
