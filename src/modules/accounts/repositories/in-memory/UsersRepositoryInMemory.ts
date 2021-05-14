import { Users } from '../interfaces/Users';
import { CreateUserDTO } from '@modules/accounts/dtos/CreateUserDTO';
import { User } from '@modules/accounts/infra/typeorm/entities/User';

export class UsersRepositoryInMemory implements Users {
  users: User[] = [];

  async create({ driverLicense, email, name, password }: CreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      driverLicense,
      email,
      name,
      password,
    });

    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async findById(id: string): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }
}
