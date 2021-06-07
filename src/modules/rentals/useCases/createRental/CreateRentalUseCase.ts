import { inject, injectable } from 'tsyringe';

import { AppError } from '@errors/AppError';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { RentalRepository } from '@modules/rentals/repositories/interfaces/RentalRepository';
import { DateProvider } from '@shared/container/providers/DateProvider/DateProvider';

interface CreateRentalRequest {
  userId: string;
  carId: string;
  expectedReturnDate: Date;
}

@injectable()
export class CreateRentalUseCase {
  minimalRentalHours = 24;

  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: RentalRepository,
    @inject('DateProvider')
    private dateProvider: DateProvider
  ) {}

  async execute({ userId, carId, expectedReturnDate }: CreateRentalRequest): Promise<Rental> {
    const currentCarRental = await this.rentalsRepository.findCurrentRentalByCar(carId);
    if (currentCarRental) throw new AppError('Car already has a rental');

    const currentUserRental = await this.rentalsRepository.findCurrentRentalByUser(userId);
    if (currentUserRental) throw new AppError("There's a rental in progress for this user.");

    const dateDifference = this.dateProvider.compareInHours(new Date(), expectedReturnDate);

    if (dateDifference < this.minimalRentalHours) {
      throw new AppError('Invalid return date, a rental should last at least 24 hours.');
    }

    const newRental = await this.rentalsRepository.create({
      userId,
      carId,
      expectedReturnDate,
    });

    return newRental;
  }
}
