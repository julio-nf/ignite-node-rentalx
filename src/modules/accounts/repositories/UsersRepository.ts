import { getRepository, Repository } from 'typeorm';

import { User } from '../entities/User';
import { Users } from './interfaces/Users';
import { CreateUserDTO } from '../dtos/CreateUserDTO';

export class UsersRepository implements Users {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({ name, email, driverLicense, password }: CreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      driverLicense,
      password,
    });

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.repository.findOne({ email });

    return user;
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await this.repository.findOne(id);

    return user;
  }
}
