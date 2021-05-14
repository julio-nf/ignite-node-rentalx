import express, { json, Request, Response } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from 'swagger.json';

import '@shared/infra/typeorm';
import '@shared/container';
import { AppError } from '@errors/AppError';
import { router } from '@shared/infra/http/routes';

const app = express();

app.use(json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(router);

app.use((err: Error, req: Request, res: Response) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: `Internal Server Error - ${err.message}`,
  });
});

app.listen(3333, () => console.log('Server is running!'));
