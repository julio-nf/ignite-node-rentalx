import { inject, injectable } from 'tsyringe';

import { Categories } from '@modules/cars/repositories/interfaces/Categories';

@injectable()
export class ListCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: Categories
  ) {}

  async execute() {
    return this.categoriesRepository.list();
  }
}
