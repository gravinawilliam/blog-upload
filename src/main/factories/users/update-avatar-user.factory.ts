import { IController } from '@shared/interfaces/controller.interface';
import { UpdateAvatarUserController } from 'src/application/controllers/users/update-avatar-user.controller';

export const makeUpdateAvatarUserController = (): IController => {
  return new UpdateAvatarUserController();
};
