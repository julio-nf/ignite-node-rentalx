import { ListCarsUseCase } from './ListCarsUseCase';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  });

  it('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car 1',
      description: 'Car description',
      dailyRate: 123.0,
      licensePlate: 'DEF-1248',
      brand: 'Car brand',
      fineAmount: 100,
      categoryId: 'Category id',
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by car name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car 2',
      description: 'Car description',
      dailyRate: 123.0,
      licensePlate: 'DEF-1248',
      brand: 'Car brand',
      fineAmount: 100,
      categoryId: 'Category id',
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });
});
