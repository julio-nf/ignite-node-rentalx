import { Category } from '../../model/Category';
import { Categories } from '../../repositories/interfaces/Categories';

export class ListCategoriesUseCase {
  constructor(private categoriesRepository: Categories) {}

  execute(): Category[] {
    return this.categoriesRepository.list();
  }
}
