import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { Cars } from '@modules/cars/repositories/interfaces/Cars';

interface ListCarsRequest {
  name?: string;
  brand?: string;
  categoryId?: string;
}

export class ListCarsUseCase {
  constructor(private carsRepository: Cars) {}

  async execute({ name, brand, categoryId }: ListCarsRequest): Promise<Car[]> {
    const cars = await this.carsRepository.findAvailable(name, brand, categoryId);
    return cars;
  }
}
