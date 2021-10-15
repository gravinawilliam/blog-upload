import { Router } from 'express';
import multer from 'multer';
import { adapterRoute } from 'src/main/adapters/express-route-adapter';
import uploadConfig from 'src/main/config/upload.config';
import { makeUpdateAvatarUserController } from 'src/main/factories/users/update-avatar-user.factory';

const upload = multer(uploadConfig.multer);

const usersRouter = Router();

usersRouter.patch(
  '/update/avatar',
  upload.single('avatar'),
  adapterRoute(makeUpdateAvatarUserController()),
);

export default usersRouter;
