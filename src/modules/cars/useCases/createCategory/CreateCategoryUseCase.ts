import { Categories } from '../../repositories/interfaces/Categories';

interface CreateCategoryRequest {
  name: string;
  description: string;
}

export class CreateCategoryUseCase {
  constructor(private categoriesRepository: Categories) {}

  execute({ name, description }: CreateCategoryRequest) {
    if (this.categoriesRepository.findByName(name)) {
      throw new Error('Category already exists.');
    }

    this.categoriesRepository.create({ name, description });
  }
}
