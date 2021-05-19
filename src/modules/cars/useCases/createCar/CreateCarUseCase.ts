import { inject, injectable } from 'tsyringe';

import { AppError } from '@errors/AppError';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { Cars } from '@modules/cars/repositories/interfaces/Cars';

interface CreateCarRequest {
  name: string;
  description: string;
  dailyRate: number;
  licensePlate: string;
  fineAmount: number;
  brand: string;
  categoryId: string;
}

@injectable()
export class CreateCarUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: Cars
  ) {}

  async execute({
    name,
    description,
    dailyRate,
    licensePlate,
    fineAmount,
    brand,
    categoryId,
  }: CreateCarRequest): Promise<Car> {
    const carAlreadyExists = await this.carsRepository.findByLicensePlate(licensePlate);

    if (carAlreadyExists) throw new AppError('Car already exists');

    return this.carsRepository.create({
      name,
      description,
      dailyRate,
      licensePlate,
      fineAmount,
      brand,
      categoryId,
    });
  }
}
