import { CreateRentalDTO } from '@modules/rentals/dtos/CreateRentalDTO';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';

export interface RentalRepository {
  create(data: CreateRentalDTO): Promise<Rental>;
  findCurrentRentalByCar(carId: string): Promise<Rental | undefined>;
  findCurrentRentalByUser(userId: string): Promise<Rental | undefined>;
}
