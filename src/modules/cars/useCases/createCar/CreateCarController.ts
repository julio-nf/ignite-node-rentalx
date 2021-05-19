import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCarUseCase } from './CreateCarUseCase';

export class CreateCarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const createCarUseCase = container.resolve(CreateCarUseCase);

    const { name, description, dailyRate, licensePlate, fineAmount, brand, categoryId } = req.body;

    const car = await createCarUseCase.execute({
      name,
      description,
      dailyRate,
      licensePlate,
      fineAmount,
      brand,
      categoryId,
    });

    return res.status(201).json(car);
  }
}
