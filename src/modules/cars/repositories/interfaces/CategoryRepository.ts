import { CreateCategoryDTO } from '@modules/cars/dtos/CreateCategoryDTO';
import { Category } from '@modules/cars/infra/typeorm/entities/Category';

export interface CategoryRepository {
  findByName(name: string): Promise<boolean>;
  list(): Promise<Category[]>;
  create({ name, description }: CreateCategoryDTO): Promise<void>;
}
