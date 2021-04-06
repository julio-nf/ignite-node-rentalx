import { inject, injectable } from 'tsyringe';

import { Categories } from '../../repositories/interfaces/Categories';

@injectable()
export class ListCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: Categories
  ) {}

  async execute() {
    return await this.categoriesRepository.list();
  }
}
