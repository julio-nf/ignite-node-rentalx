import { CreateCarDTO } from '@modules/cars/dtos/CreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

export interface Cars {
  create(data: CreateCarDTO): Promise<Car>;
  findByLicensePlate(licensePlate: string): Promise<Car | undefined>;
  findAvailable(name?: string, brand?: string, categoryId?: string): Promise<Car[]>;
  findById(carId: string): Promise<Car | undefined>;
}
