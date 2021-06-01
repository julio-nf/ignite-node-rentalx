import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';
import { AppError } from '@errors/AppError';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  it('should be able to add a new specification to the car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Name Car',
      description: 'Description Car',
      dailyRate: 100,
      licensePlate: 'ABC-1234',
      fineAmount: 60,
      brand: 'Brand',
      categoryId: 'category',
    });

    const specification = await specificationsRepositoryInMemory.create({
      name: 'Test Specification',
      description: 'Specification for test',
    });

    const specificationsId = [String(specification.id)];

    const specificationsCars = await createCarSpecificationUseCase.execute({
      carId: car.id as string,
      specificationsId,
    });

    expect(specificationsCars).toHaveProperty('specifications');
    expect(specificationsCars.specifications).toEqual([specification]);
  });

  it('should not be able to add a new specification to a non-existent car', async () => {
    expect(async () => {
      const carId = '1234';
      const specificationsId = ['5431'];

      await createCarSpecificationUseCase.execute({ carId, specificationsId });
    }).rejects.toBeInstanceOf(AppError);
  });
});
