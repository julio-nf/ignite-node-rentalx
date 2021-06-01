import { CategoryRepository } from '../interfaces/CategoryRepository';
import { CreateCategoryDTO } from '@modules/cars/dtos/CreateCategoryDTO';
import { Category } from '@modules/cars/infra/typeorm/entities/Category';

export class CategoriesRepositoryInMemory implements CategoryRepository {
  categories: Category[] = [];

  async findByName(name: string): Promise<boolean> {
    return !!this.categories.find((category) => category.name === name);
  }

  async list(): Promise<Category[]> {
    return this.categories;
  }

  async create({ name, description }: CreateCategoryDTO): Promise<void> {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
    });

    this.categories.push(category);
  }
}
