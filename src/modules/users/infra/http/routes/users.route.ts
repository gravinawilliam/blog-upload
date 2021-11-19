import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload.config';
import ensureAuthenticated from '@shared/infra/middlewares/ensure-authenticated';
import UpdateAvatarUserController from '../controllers/update-avatar-user.controller';

const upload = multer(uploadConfig.multer);

const usersRouter = Router();
const updateAvatarUserController = new UpdateAvatarUserController();

usersRouter.get('/', () => {
  return true;
});

usersRouter.patch(
  '/avatar/update',
  ensureAuthenticated,
  upload.single('avatar'),
  updateAvatarUserController.execute,
);

export default usersRouter;
