import { container } from 'tsyringe';

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { Users } from '@modules/accounts/repositories/interfaces/Users';
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository';
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository';
import { SpecificationsRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository';
import { Cars } from '@modules/cars/repositories/interfaces/Cars';
import { Categories } from '@modules/cars/repositories/interfaces/Categories';
import { Specifications } from '@modules/cars/repositories/interfaces/Specifications';

// Categories
container.registerSingleton<Categories>('CategoriesRepository', CategoriesRepository);

// Specification
container.registerSingleton<Specifications>('SpecificationsRepository', SpecificationsRepository);

// Users
container.registerSingleton<Users>('UsersRepository', UsersRepository);

// Cars
container.registerSingleton<Cars>('CarsRepository', CarsRepository);
