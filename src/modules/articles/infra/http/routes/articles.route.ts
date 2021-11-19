import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload.config';
import UpdateContentArticleController from '../controllers/update-content-article.controller';
import UpdateThumbnailArticleController from '../controllers/update-thumbnail-article.controller';

const upload = multer(uploadConfig.multer);

const articlesRouter = Router();
const updateContentArticleController = new UpdateContentArticleController();
const updateThumbnailArticleController = new UpdateThumbnailArticleController();

articlesRouter.patch(
  '/content/update/:article_id',
  upload.single('content'),
  updateContentArticleController.execute,
);

articlesRouter.patch(
  '/thumbnail/update/:article_id',
  upload.single('thumbnail'),
  updateThumbnailArticleController.execute,
);

export default articlesRouter;
