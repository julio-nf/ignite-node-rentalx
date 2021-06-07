import { hash } from 'bcryptjs';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;

describe('Create Category Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuid();
    const password = await hash('admin', 8);

    await connection.query(
      `
      INSERT INTO USERS (id, name, email, password, is_admin, created_at, driver_license)
      VALUES ('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXXXX')
    `
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to create a new category', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com.br',
      password: 'admin',
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post('/categories')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        name: 'Category Name Supertest',
        description: 'Category Description Supertest',
      });

    expect(response.status).toBe(201);
  });

  it('should not be able to create a new category if name already exists', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com.br',
      password: 'admin',
    });

    const { token } = responseToken.body;

    await request(app)
      .post('/categories')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        name: 'Category Name Supertest 2',
        description: 'Category Description Supertest 2',
      });

    const response = await request(app)
      .post('/categories')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        name: 'Category Name Supertest 2',
        description: 'Category Description Supertest 2',
      });

    expect(response.status).toBe(400);
  });
});
