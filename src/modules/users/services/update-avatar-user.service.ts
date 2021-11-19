import { IDataReplicationProvider } from '@shared/container/providers/DataReplication/models/IDataReplicationProvider';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import { IUpdateAvatarUserDTO } from '../interfaces/dtos/update-avatar-user.dto';
import UserModel from '../interfaces/models/user.model';
import IUsersRepository from '../interfaces/repositories/users.repository';

@injectable()
export default class UpdateAvatarUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
    @inject('DataReplication')
    private readonly dataReplications: IDataReplicationProvider,
  ) {}

  public async execute({
    user_id,
    avatar,
  }: IUpdateAvatarUserDTO): Promise<UserModel> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401);
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile({
        file: user.avatar,
        type: 'avatar',
      });
    }

    const { fileName, url } = await this.storageProvider.saveFile({
      file: avatar,
      type: 'avatar',
    });

    user.avatar = fileName;

    await this.usersRepository.update(user);

    this.dataReplications.user({
      ...user,
      avatar: url,
    });

    return user;
  }
}
