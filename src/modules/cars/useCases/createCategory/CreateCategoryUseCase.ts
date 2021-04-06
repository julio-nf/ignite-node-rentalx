import { inject, injectable } from 'tsyringe';

import { Categories } from '../../repositories/interfaces/Categories';

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
      throw new Error('Category already exists.');
    }

    await this.categoriesRepository.create({ name, description });
  }
}
