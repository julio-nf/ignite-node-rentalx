import { Categories, CreateCategoryDTO } from '../interfaces/Categories';
import { Category } from '@modules/cars/infra/typeorm/entities/Category';

export class CategoriesRepositoryInMemory implements Categories {
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
