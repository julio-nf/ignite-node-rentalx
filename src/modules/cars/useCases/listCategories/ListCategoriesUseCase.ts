import { Category } from '../../entities/Category';
import { Categories } from '../../repositories/interfaces/Categories';

export class ListCategoriesUseCase {
  constructor(private categoriesRepository: Categories) {}

  async execute() {
    return await this.categoriesRepository.list();
  }
}
