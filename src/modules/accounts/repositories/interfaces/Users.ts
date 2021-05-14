import { CreateUserDTO } from '@modules/accounts/dtos/CreateUserDTO';
import { User } from '@modules/accounts/infra/typeorm/entities/User';

export interface Users {
  create(data: CreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
}
