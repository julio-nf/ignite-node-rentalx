import { container } from 'tsyringe';
import { Specification } from '../../modules/cars/entities/Specification';
import { CategoriesRepository } from '../../modules/cars/repositories/CategoriesRepository';
import { Categories } from '../../modules/cars/repositories/interfaces/Categories';
import { SpecificationsRepository } from '../../modules/cars/repositories/SpecificationsRepository';

// Categories
container.registerSingleton<Categories>('CategoriesRepository', CategoriesRepository);

// Specification
container.registerSingleton<Specification>('SpecificationsRepository', SpecificationsRepository);
