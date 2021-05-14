import { getRepository, Repository } from 'typeorm';

import { Category } from '../entities/Category';
import { Categories, CreateCategoryDTO } from '@modules/cars/repositories/interfaces/Categories';

export class CategoriesRepository implements Categories {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  // public static getInstance(): CategoriesRepository {
  //   if (!CategoriesRepository.INSTANCE) {
  //     CategoriesRepository.INSTANCE = new CategoriesRepository();
  //   }

  //   return CategoriesRepository.INSTANCE;
  // }

  async list() {
    return this.repository.find();
  }

  async findByName(name: string) {
    return !!(await this.repository.findOne({ name }));
  }

  async create({ name, description }: CreateCategoryDTO) {
    const category = this.repository.create({
      name,
      description,
    });

    await this.repository.save(category);
  }
}
