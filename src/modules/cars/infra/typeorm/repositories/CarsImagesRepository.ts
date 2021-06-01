import { getRepository, Repository } from 'typeorm';

import { CarImages } from '../entities/CarImages';
import { CarImagesRepository } from '@modules/cars/repositories/interfaces/CarsImages';

export class CarsImagesRepository implements CarImagesRepository {
  private repository: Repository<CarImages>;

  constructor() {
    this.repository = getRepository(CarImages);
  }

  async create(carId: string, imageName: string): Promise<CarImages> {
    const carImages = this.repository.create({
      carId,
      imageName,
    });

    await this.repository.save(carImages);

    return carImages;
  }
}
