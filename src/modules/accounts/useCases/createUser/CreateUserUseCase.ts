import bcrypt from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../errors/AppError';
import { CreateUserDTO } from '../../dtos/CreateUserDTO';
import { Users } from '../../repositories/interfaces/Users';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: Users
  ) {}

  async execute({ name, email, driverLicense, password }: CreateUserDTO): Promise<void> {
    const userAlreadyExist = await this.usersRepository.findByEmail(email);

    if (userAlreadyExist) throw new AppError('User already exists');

    const passwordHash = await bcrypt.hash(password, 10);

    await this.usersRepository.create({
      name,
      email,
      driverLicense,
      password: passwordHash,
    });
  }
}
