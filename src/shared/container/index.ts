import { container } from 'tsyringe';

import { Users } from '../../modules/accounts/repositories/interfaces/Users';
import { UsersRepository } from '../../modules/accounts/repositories/UsersRepository';

import { Specifications } from '../../modules/cars/repositories/interfaces/Specifications';
import { SpecificationsRepository } from '../../modules/cars/repositories/SpecificationsRepository';

import { Categories } from '../../modules/cars/repositories/interfaces/Categories';
import { CategoriesRepository } from '../../modules/cars/repositories/CategoriesRepository';

// Categories
container.registerSingleton<Categories>('CategoriesRepository', CategoriesRepository);

// Specification
container.registerSingleton<Specifications>('SpecificationsRepository', SpecificationsRepository);

// Users
container.registerSingleton<Users>('UsersRepository', UsersRepository);
