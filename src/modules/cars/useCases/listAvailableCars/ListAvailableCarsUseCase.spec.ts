import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
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

    const cars = await listAvailableCarsUseCase.execute({});

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

    const cars = await listAvailableCarsUseCase.execute({
      name: 'Car 2',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by category', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car 2',
      description: 'Car description',
      dailyRate: 123.0,
      licensePlate: 'DEF-1248',
      brand: 'Car brand',
      fineAmount: 100,
      categoryId: '12345',
    });

    const cars = await listAvailableCarsUseCase.execute({
      categoryId: '12345',
    });

    expect(cars).toEqual([car]);
  });
});
