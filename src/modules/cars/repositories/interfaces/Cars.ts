import { CreateCarDTO } from '@modules/cars/dtos/CreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

export interface Cars {
  create(data: CreateCarDTO): Promise<Car>;
  findByLicensePlate(licensePlate: string): Promise<Car | undefined>;
}
