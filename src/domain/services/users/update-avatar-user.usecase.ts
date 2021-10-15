import {
  IParamsUpdateAvatarUserUseCaseDTO,
  IResponseUpdateAvatarUserUseCaseDTO,
} from '@dtos/users/update-avatar-user.dto';

export interface IUpdateAvatarUserUseCase {
  execute(
    params: IParamsUpdateAvatarUserUseCaseDTO,
  ): Promise<IResponseUpdateAvatarUserUseCaseDTO>;
}
