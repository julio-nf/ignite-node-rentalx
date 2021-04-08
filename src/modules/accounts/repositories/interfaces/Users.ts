import { CreateUserDTO } from '../../dtos/CreateUserDTO';
import { User } from '../../entities/User';

export interface Users {
  create(data: CreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
}
