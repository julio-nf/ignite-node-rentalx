import dayjs from 'dayjs';

import { CreateRentalUseCase } from './CreateRentalUseCase';
import { AppError } from '@errors/AppError';
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { DayJsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayJsDateProvider';

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayJsDateProvider: DayJsDateProvider;
let createRentalUseCase: CreateRentalUseCase;

describe('Create Rental', () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayJsDateProvider = new DayJsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayJsDateProvider);
  });

  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      userId: '12345',
      carId: '54321',
      expectedReturnDate: dayjs().add(1, 'day').toDate(),
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('startDate');
  });

  it('should not be able to create a new rental if there is a current rental for this user', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        userId: '12345',
        carId: '54321',
        expectedReturnDate: new Date(),
      });

      await createRentalUseCase.execute({
        userId: '12345',
        carId: '1289374',
        expectedReturnDate: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental if there is a current rental for this car', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        userId: '12345',
        carId: '54321',
        expectedReturnDate: new Date(),
      });

      await createRentalUseCase.execute({
        userId: '309283',
        carId: '54321',
        expectedReturnDate: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental with less than 24 hours of duration', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        userId: '12345',
        carId: '54321',
        expectedReturnDate: dayjs().add(8, 'hours').toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
