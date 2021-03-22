/* eslint-disable class-methods-use-this */
import fs from 'fs';
import csvParser from 'csv-parser';

import { CategoriesRepository } from '../../repositories/CategoriesRepository';
import { CreateCategoryDTO } from '../../repositories/interfaces/Categories';

export class ImportCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  loadCategories(file: Express.Multer.File): Promise<CreateCategoryDTO[]> {
    return new Promise((resolve, reject) => {
      const categories: CreateCategoryDTO[] = [];

      fs.createReadStream(file.path)
        .pipe(csvParser())
        .on('data', (line) => categories.push(line))
        .on('end', () => {
          fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on('error', (err) => reject(err));
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    categories.forEach(async (category) => {
      const { name, description } = category;

      if (!this.categoriesRepository.findByName(name)) {
        this.categoriesRepository.create({ name, description });
      }
    });
  }
}
