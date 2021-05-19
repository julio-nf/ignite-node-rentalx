import { Cars } from '../interfaces/Cars';
import { CreateCarDTO } from '@modules/cars/dtos/CreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

export class CarsRepositoryInMemory implements Cars {
  cars: Car[] = [];

  async create({
    name,
    description,
    dailyRate,
    licensePlate,
    brand,
    fineAmount,
    categoryId,
  }: CreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      description,
      dailyRate,
      licensePlate,
      brand,
      fineAmount,
      categoryId,
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(licensePlate: string): Promise<Car | undefined> {
    return this.cars.find((car) => car.licensePlate === licensePlate);
  }
}
