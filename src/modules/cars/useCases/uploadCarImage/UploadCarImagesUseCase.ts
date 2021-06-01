import { inject, injectable } from 'tsyringe';

import { CarImagesRepository } from '@modules/cars/repositories/interfaces/CarsImages';

interface UploadCarImagesRequest {
  carId: string;
  imageNames: string[];
}

@injectable()
export class UploadCarImagesUseCase {
  constructor(
    @inject('CarsImagesRepository')
    private carsImagesRepository: CarImagesRepository
  ) {}

  async execute({ carId, imageNames }: UploadCarImagesRequest): Promise<void> {
    imageNames.map(async (image) => {
      await this.carsImagesRepository.create(carId, image);
    });
  }
}
