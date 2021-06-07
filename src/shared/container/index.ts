import { container } from 'tsyringe';

import '@shared/container/providers';

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { Users } from '@modules/accounts/repositories/interfaces/Users';
import { CarsImagesRepository } from '@modules/cars/infra/typeorm/repositories/CarsImagesRepository';
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository';
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository';
import { SpecificationsRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository';
import { CarRepository } from '@modules/cars/repositories/interfaces/CarRepository';
import { CarImagesRepository } from '@modules/cars/repositories/interfaces/CarsImages';
import { CategoryRepository } from '@modules/cars/repositories/interfaces/CategoryRepository';
import { SpecificationRepository } from '@modules/cars/repositories/interfaces/SpecificationRepository';
import { RentalsRepository } from '@modules/rentals/infra/typeorm/repositories/RentalsRepository';
import { RentalRepository } from '@modules/rentals/repositories/interfaces/RentalRepository';

// Categories
container.registerSingleton<CategoryRepository>('CategoriesRepository', CategoriesRepository);

// Specification
container.registerSingleton<SpecificationRepository>(
  'SpecificationsRepository',
  SpecificationsRepository
);

// Users
container.registerSingleton<Users>('UsersRepository', UsersRepository);

// Cars
container.registerSingleton<CarRepository>('CarsRepository', CarsRepository);

// CarImages
container.registerSingleton<CarImagesRepository>('CarsImagesRepository', CarsImagesRepository);

// Rentals
container.registerSingleton<RentalRepository>('RentalsRepository', RentalsRepository);
