import { getRepository, Repository } from 'typeorm';

import { Car } from '../entities/Car';
import { CreateCarDTO } from '@modules/cars/dtos/CreateCarDTO';
import { Cars } from '@modules/cars/repositories/interfaces/Cars';

export class CarsRepository implements Cars {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    name,
    description,
    brand,
    licensePlate,
    dailyRate,
    fineAmount,
    categoryId,
  }: CreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      description,
      brand,
      licensePlate,
      dailyRate,
      fineAmount,
      categoryId,
    });

    await this.repository.save(car);

    return car;
  }

  async findByLicensePlate(licensePlate: string): Promise<Car | undefined> {
    return this.repository.findOne({
      licensePlate,
    });
  }
}
