import 'reflect-metadata';

import express, { json, NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import swaggerDocument from '../../../swagger.json';
import '@shared/container';
import { AppError } from '@errors/AppError';
import { router } from '@shared/infra/http/routes';
import createConnection from '@shared/infra/typeorm';

createConnection();

export const app = express();

app.use(json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: 'error',
      message: `Internal Server Error - ${err.message}`,
    });
  }

  next(err);
});
