import { UserModel } from '../../models/user.model';

export type IParamsUpdateAvatarUserUseCaseDTO = {
  user: UserModel;
  avatar: string;
};

export type IResponseUpdateAvatarUserUseCaseDTO = {
  avatarUrl: string;
};

export type IParamsUpdateAvatarUserValidatorDTO = {
  userId: string;
};

export type IResponseUpdateAvatarUserValidatorDTO = {
  user: UserModel;
};
