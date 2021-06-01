import { inject, injectable } from 'tsyringe';

import { AppError } from '@errors/AppError';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { CarRepository } from '@modules/cars/repositories/interfaces/CarRepository';
import { SpecificationRepository } from '@modules/cars/repositories/interfaces/SpecificationRepository';

interface CreateCarSpecificationRequest {
  carId: string;
  specificationsId: string[];
}

@injectable()
export class CreateCarSpecificationUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: CarRepository,
    @inject('SpecificationsRepository')
    private specificationsRepository: SpecificationRepository
  ) {}

  async execute({ carId, specificationsId }: CreateCarSpecificationRequest): Promise<Car> {
    const car = await this.carsRepository.findById(carId);

    if (!car) throw new AppError("Car doesn't exists");

    const specifications = await this.specificationsRepository.findByIds(specificationsId);

    car.specifications = specifications;

    await this.carsRepository.create(car);

    return car;
  }
}
