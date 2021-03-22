import { Specifications, SpecificationsDTO } from '../../repositories/interfaces/Specifications';

export class CreateSpecificationUseCase {
  constructor(private specificationRepository: Specifications) {}

  execute({ name, description }: SpecificationsDTO): void {
    if (this.specificationRepository.findByName(name)) {
      throw new Error('Specification already exists.');
    }

    this.specificationRepository.create({ name, description });
  }
}
