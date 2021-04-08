import bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../errors/AppError';

import { Users } from '../../repositories/interfaces/Users';

interface AuthenticateUser {
  email: string;
  password: string;
}

interface UserAuthenticated {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: Users
  ) {}

  async execute({ email, password }: AuthenticateUser): Promise<UserAuthenticated> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new AppError('Email or password is incorrect');

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) throw new AppError('Email or password is incorrect');

    const token = sign({}, 'a558ca2fbddbce6b42a49e6ff7434172', {
      subject: user.id,
      expiresIn: '1d',
    });

    const createdToken: UserAuthenticated = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    };
    return createdToken;
  }
}
