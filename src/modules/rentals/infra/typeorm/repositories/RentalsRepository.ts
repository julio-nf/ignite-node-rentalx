import { getRepository, Repository } from 'typeorm';

import { Rental } from '../entities/Rental';
import { CreateRentalDTO } from '@modules/rentals/dtos/CreateRentalDTO';
import { RentalRepository } from '@modules/rentals/repositories/interfaces/RentalRepository';

export class RentalsRepository implements RentalRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async create({ userId, carId, expectedReturnDate }: CreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      userId,
      carId,
      expectedReturnDate,
    });

    await this.repository.save(rental);

    return rental;
  }

  async findCurrentRentalByCar(carId: string): Promise<Rental | undefined> {
    const currentCarRental = await this.repository.findOne({ carId });

    return currentCarRental;
  }

  async findCurrentRentalByUser(userId: string): Promise<Rental | undefined> {
    const currentUserRental = await this.repository.findOne({ userId });

    return currentUserRental;
  }
}
