import { getRepository, Repository } from 'typeorm';

import { Car } from '../entities/Car';
import { CreateCarDTO } from '@modules/cars/dtos/CreateCarDTO';
import { CarRepository } from '@modules/cars/repositories/interfaces/CarRepository';

export class CarsRepository implements CarRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    id,
    name,
    description,
    brand,
    licensePlate,
    dailyRate,
    fineAmount,
    categoryId,
    specifications,
  }: CreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      id,
      name,
      description,
      brand,
      licensePlate,
      dailyRate,
      fineAmount,
      categoryId,
      specifications,
    });

    await this.repository.save(car);

    return car;
  }

  async findByLicensePlate(licensePlate: string): Promise<Car | undefined> {
    return this.repository.findOne({
      licensePlate,
    });
  }

  async findAvailable(name?: string, brand?: string, categoryId?: string): Promise<Car[]> {
    const carsQuery = this.repository
      .createQueryBuilder('c')
      .where('available = :available', { available: true });

    if (brand) {
      carsQuery.andWhere('brand = :brand', { brand });
    }

    if (name) {
      carsQuery.andWhere('name = :name', { name });
    }

    if (categoryId) {
      carsQuery.andWhere('category_id = :categoryId', { categoryId });
    }

    const cars = await carsQuery.getMany();

    return cars;
  }

  async findById(carId: string): Promise<Car | undefined> {
    const car = await this.repository.findOne(carId);

    return car;
  }
}
