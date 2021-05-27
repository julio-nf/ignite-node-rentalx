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

  async findAvailable(name?: string, brand?: string, categoryId?: string): Promise<Car[]> {
    return this.cars.filter((car) => {
      // Esse trecho retorna apenas carros disponíveis caso não seja passado parâmetros.
      // Caso seja passado algum parâmetro ele retornará os carros correspondentes
      // independentemente se este está disponível ou não.
      // ------------------------------------------------------------------
      if (
        (name && car.name === name) ||
        (brand && car.brand === brand) ||
        (categoryId && car.categoryId === categoryId) ||
        car.available
      ) {
        return car;
      }

      return null;

      // Esse trecho volta APENAS carros disponíveis.
      // Além disso, caso seja passado algum parametro e não existam carros
      // disponíveis correspondente a esses parametros não será retornado nada.
      // ----------------------------------------------------------------------
      // if (!car.available) return null;

      // if (name || brand || categoryId) {
      //   if (car.name === name || car.brand === brand || car.categoryId === categoryId) {
      //     return car;
      //   }

      //   return null;
      // }

      // return car;
    });
  }
}
