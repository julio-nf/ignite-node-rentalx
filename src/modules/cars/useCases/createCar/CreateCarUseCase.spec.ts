import { CreateCarUseCase } from './CreateCarUseCase';
import { AppError } from '@errors/AppError';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

let carsRepository: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Name Car',
      description: 'Description Car',
      dailyRate: 100,
      licensePlate: 'ABC-1234',
      fineAmount: 60,
      brand: 'Brand',
      categoryId: 'category',
    });

    expect(car).toHaveProperty('id');
  });

  it('should not be able to create a car if license plate already exists', () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: 'Name Car',
        description: 'Description Car',
        dailyRate: 100,
        licensePlate: 'ABC-1234',
        fineAmount: 60,
        brand: 'Brand',
        categoryId: 'category',
      });

      await createCarUseCase.execute({
        name: 'Name Car 2',
        description: 'Description Car 2',
        dailyRate: 200,
        licensePlate: 'ABC-1234',
        fineAmount: 120,
        brand: 'Brand',
        categoryId: 'category',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a car with availability by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car Available',
      description: 'Description Car',
      dailyRate: 100,
      licensePlate: 'ABCD-123',
      fineAmount: 60,
      brand: 'Brand',
      categoryId: 'category',
    });

    expect(car.available).toBeTruthy();
  });
});
