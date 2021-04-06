import { inject, injectable } from 'tsyringe';
import { Specifications, SpecificationsDTO } from '../../repositories/interfaces/Specifications';

@injectable()
export class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationRepository: Specifications
  ) {}

  async execute({ name, description }: SpecificationsDTO) {
    if (await this.specificationRepository.findByName(name)) {
      throw new Error('Specification already exists.');
    }

    await this.specificationRepository.create({ name, description });
  }
}
