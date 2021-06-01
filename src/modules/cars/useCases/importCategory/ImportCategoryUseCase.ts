/* eslint-disable class-methods-use-this */
import csvParser from 'csv-parser';
import fs from 'fs';
import { inject, injectable } from 'tsyringe';

import { CreateCategoryDTO } from '@modules/cars/dtos/CreateCategoryDTO';
import { CategoryRepository } from '@modules/cars/repositories/interfaces/CategoryRepository';

@injectable()
export class ImportCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: CategoryRepository
  ) {}

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

      if (!(await this.categoriesRepository.findByName(name))) {
        await this.categoriesRepository.create({ name, description });
      }
    });
  }
}
