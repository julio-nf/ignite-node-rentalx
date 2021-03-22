import { Category } from '../model/Category';
import { Categories, CreateCategoryDTO } from './interfaces/Categories';

export class CategoriesRepository implements Categories {
  private categories: Category[];

  private static INSTANCE: CategoriesRepository;

  private constructor() {
    this.categories = [];
  }

  public static getInstance(): CategoriesRepository {
    if (!CategoriesRepository.INSTANCE) {
      CategoriesRepository.INSTANCE = new CategoriesRepository();
    }

    return CategoriesRepository.INSTANCE;
  }

  list() {
    return this.categories;
  }

  findByName(name: string) {
    return this.categories.some((s) => s.name === name);
  }

  create({ name, description }: CreateCategoryDTO) {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
      createdAt: new Date(),
    });

    this.categories.push(category);
  }
}
