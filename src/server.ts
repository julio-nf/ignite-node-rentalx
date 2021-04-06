import express, { json } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

import './database';

import './shared/container';

import { router } from './routes';

const app = express();

app.use(json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(router);

app.listen(3333, () => console.log('Server is running!'));
