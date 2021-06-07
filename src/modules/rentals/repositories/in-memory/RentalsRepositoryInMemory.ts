import { RentalRepository } from '../interfaces/RentalRepository';
import { CreateRentalDTO } from '@modules/rentals/dtos/CreateRentalDTO';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';

export class RentalsRepositoryInMemory implements RentalRepository {
  rentals: Rental[] = [];

  async create({ userId, carId, expectedReturnDate }: CreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      userId,
      carId,
      expectedReturnDate,
      startDate: new Date(),
    });

    this.rentals.push(rental);

    return rental;
  }

  async findCurrentRentalByCar(carId: string): Promise<Rental | undefined> {
    const currentCarRental = this.rentals.find(
      (rental) => rental.carId === carId && !rental.endDate
    );

    return currentCarRental;
  }

  async findCurrentRentalByUser(userId: string): Promise<Rental | undefined> {
    const currentUserRental = this.rentals.find(
      (rental) => rental.userId === userId && !rental.endDate
    );

    return currentUserRental;
  }
}
