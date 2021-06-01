import { inject, injectable } from 'tsyringe';

import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { Cars } from '@modules/cars/repositories/interfaces/Cars';

interface ListAvailableCarsRequest {
  name?: string;
  brand?: string;
  categoryId?: string;
}

@injectable()
export class ListAvailableCarsUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: Cars
  ) {}

  async execute({ name, brand, categoryId }: ListAvailableCarsRequest): Promise<Car[]> {
    const cars = await this.carsRepository.findAvailable(name, brand, categoryId);
    return cars;
  }
}
