import { Router } from 'express';
import multer from 'multer';

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

categoriesRoutes.post('/', createCategoryController.handle);

categoriesRoutes.post('/import', uploader.single('file'), importCategory.handle);
