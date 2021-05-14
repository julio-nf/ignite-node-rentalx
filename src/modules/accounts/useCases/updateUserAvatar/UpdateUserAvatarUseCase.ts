import { inject, injectable } from 'tsyringe';

import { Users } from '@modules/accounts/repositories/interfaces/Users';
import { deleteFile } from '@utils/files';

interface UpdateAvatar {
  userId: string;
  avatarFile: string;
}

@injectable()
export class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: Users
  ) {}

  async execute({ userId, avatarFile }: UpdateAvatar) {
    const user = await this.usersRepository.findById(userId);

    if (user) {
      if (user.avatar) await deleteFile(`./tmp/avatar/${user.avatar}`);

      user.avatar = avatarFile;

      await this.usersRepository.create(user);
    }
  }
}
