import { inject, injectable } from 'tsyringe';

import { AppError } from '@errors/AppError';
import { Categories } from '@modules/cars/repositories/interfaces/Categories';

interface CreateCategoryRequest {
  name: string;
  description: string;
}

@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: Categories
  ) {}

  async execute({ name, description }: CreateCategoryRequest) {
    if (await this.categoriesRepository.findByName(name)) {
      throw new AppError('Category already exists.');
    }

    await this.categoriesRepository.create({ name, description });
  }
}
