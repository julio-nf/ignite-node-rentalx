import { getRepository, Repository } from 'typeorm';

import { User } from '../entities/User';
import { CreateUserDTO } from '@modules/accounts/dtos/CreateUserDTO';
import { Users } from '@modules/accounts/repositories/interfaces/Users';

export class UsersRepository implements Users {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({ name, email, driverLicense, password, avatar, id }: CreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      driverLicense,
      password,
      avatar,
      id,
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
