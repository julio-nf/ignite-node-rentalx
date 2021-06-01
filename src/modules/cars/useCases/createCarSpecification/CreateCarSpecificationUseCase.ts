import { inject, injectable } from 'tsyringe';

import { AppError } from '@errors/AppError';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { Cars } from '@modules/cars/repositories/interfaces/Cars';
import { Specifications } from '@modules/cars/repositories/interfaces/Specifications';

interface CreateCarSpecificationRequest {
  carId: string;
  specificationsId: string[];
}

@injectable()
export class CreateCarSpecificationUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: Cars,
    @inject('SpecificationsRepository')
    private specificationsRepository: Specifications
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
