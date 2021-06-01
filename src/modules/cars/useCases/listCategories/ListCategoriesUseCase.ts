import { inject, injectable } from 'tsyringe';

import { CategoryRepository } from '@modules/cars/repositories/interfaces/CategoryRepository';

@injectable()
export class ListCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: CategoryRepository
  ) {}

  async execute() {
    return this.categoriesRepository.list();
  }
}
