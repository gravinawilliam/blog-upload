import { IDeleteFileStorageProvider } from '@domain/providers/storage/delete-file-storage.provider';
import { ISaveFileStorageProvider } from '@domain/providers/storage/save-file-storage.provider';
import { IUpdateUserRepository } from '@domain/repositories/users/update-user.repository';
import { IUpdateAvatarUserUseCase } from '@domain/services/users/update-avatar-user.usecase';
import {
  IParamsUpdateAvatarUserUseCaseDTO,
  IResponseUpdateAvatarUserUseCaseDTO,
} from '@dtos/users/update-avatar-user.dto';
import uploadConfig from '@main/config/upload.config';

export class UpdateAvatarUserUseCase implements IUpdateAvatarUserUseCase {
  constructor(
    private readonly usersRepository: IUpdateUserRepository,
    private readonly storageProvider: IDeleteFileStorageProvider &
      ISaveFileStorageProvider,
  ) {}

  public async execute({
    user,
    avatar,
  }: IParamsUpdateAvatarUserUseCaseDTO): Promise<IResponseUpdateAvatarUserUseCaseDTO> {
    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    const fileName = await this.storageProvider.saveFile(avatar);

    await this.usersRepository.update({
      ...user,
      avatar: fileName,
    });

    return {
      avatarUrl: `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${fileName}`,
    };
  }
}
