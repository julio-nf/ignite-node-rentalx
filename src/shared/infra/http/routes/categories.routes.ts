import { Router } from 'express';
import multer from 'multer';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController';
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/ImportCategoryController';
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/ListCategoriesController';

export const categoriesRoutes = Router();

const uploader = multer({
  dest: './tmp',
});

const createCategoryController = new CreateCategoryController();
const importCategory = new ImportCategoryController();
const listCategories = new ListCategoriesController();

categoriesRoutes.get('/', listCategories.handle);

categoriesRoutes.post('/', ensureAuthenticated, ensureAdmin, createCategoryController.handle);

categoriesRoutes.post(
  '/import',
  ensureAuthenticated,
  ensureAdmin,
  uploader.single('file'),
  importCategory.handle
);
