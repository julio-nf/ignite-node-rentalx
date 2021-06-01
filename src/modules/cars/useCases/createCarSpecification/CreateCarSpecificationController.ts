import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

export class CreateCarSpecificationController {
  async handle(req: Request, res: Response) {
    const { carId } = req.params;
    const { specificationsId } = req.body;

    const createCarSpecificationUseCase = container.resolve(CreateCarSpecificationUseCase);

    const car = await createCarSpecificationUseCase.execute({ carId, specificationsId });

    return res.json(car);
  }
}
