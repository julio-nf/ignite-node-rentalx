import { CarImages } from '@modules/cars/infra/typeorm/entities/CarImages';

export interface CarImagesRepository {
  create(carId: string, imageName: string): Promise<CarImages>;
}
