import { inject, injectable } from 'tsyringe';

import { AppError } from '@errors/AppError';
import { CategoryRepository } from '@modules/cars/repositories/interfaces/CategoryRepository';

interface CreateCategoryRequest {
  name: string;
  description: string;
}

@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: CategoryRepository
  ) {}

  async execute({ name, description }: CreateCategoryRequest) {
    if (await this.categoriesRepository.findByName(name)) {
      throw new AppError('Category already exists.');
    }

    await this.categoriesRepository.create({ name, description });
  }
}
