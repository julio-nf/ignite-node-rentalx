import { Category } from '../../model/Category';

export interface Categories {
  findByName(name: string): boolean;
  list(): Category[];
  create({ name, description }: CreateCategoryDTO): void;
}

export interface CreateCategoryDTO {
  name: string;
  description: string;
}
