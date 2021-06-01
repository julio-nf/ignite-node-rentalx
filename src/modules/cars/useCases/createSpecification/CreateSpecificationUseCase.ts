import { inject, injectable } from 'tsyringe';

import { AppError } from '@errors/AppError';
import { SpecificationsDTO } from '@modules/cars/dtos/CreateSpecificationDTO';
import { SpecificationRepository } from '@modules/cars/repositories/interfaces/SpecificationRepository';

@injectable()
export class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationRepository: SpecificationRepository
  ) {}

  async execute({ name, description }: SpecificationsDTO) {
    if (await this.specificationRepository.findByName(name)) {
      throw new AppError('Specification already exists.');
    }

    await this.specificationRepository.create({ name, description });
  }
}
