import { inject, injectable } from 'tsyringe';

import { AppError } from '@errors/AppError';
import { SpecificationsDTO } from '@modules/cars/dtos/CreateSpecificationDTO';
import { Specifications } from '@modules/cars/repositories/interfaces/Specifications';

@injectable()
export class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationRepository: Specifications
  ) {}

  async execute({ name, description }: SpecificationsDTO) {
    if (await this.specificationRepository.findByName(name)) {
      throw new AppError('Specification already exists.');
    }

    await this.specificationRepository.create({ name, description });
  }
}
