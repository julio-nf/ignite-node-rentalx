export interface Specifications {
  create({ name, description }: SpecificationsDTO): void;
  findByName(name: string): boolean;
}

export interface SpecificationsDTO {
  name: string;
  description: string;
}
