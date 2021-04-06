export interface Specifications {
  create({ name, description }: SpecificationsDTO): Promise<void>;
  findByName(name: string): Promise<boolean>;
}

export interface SpecificationsDTO {
  name: string;
  description: string;
}
