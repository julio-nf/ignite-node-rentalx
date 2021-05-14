import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '@errors/AppError';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';

interface TokenPayload {
  sub: string;
}

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) throw new AppError('Missing authentication token', 401);

  const [, token] = authHeader.split(' ');

  try {
    const { sub: userId } = verify(token, 'a558ca2fbddbce6b42a49e6ff7434172') as TokenPayload;

    const usersRepository = new UsersRepository();

    const user = usersRepository.findById(userId);

    if (!user) throw new AppError('User does not exists', 401);

    req.user = {
      id: userId,
    };

    return next();
  } catch {
    throw new AppError('Invalid token', 401);
  }
}
