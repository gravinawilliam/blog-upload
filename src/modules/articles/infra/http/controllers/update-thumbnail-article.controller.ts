import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import UpdateThumbnailArticleService from '@modules/articles/services/update-thumbnail-article.service';

export default class UpdateThumbnailArticleController {
  public async execute(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(UpdateThumbnailArticleService);
    const article = await service.execute({
      articleId: req.params.article_id,
      thumbnail: req.file?.filename ?? '',
    });
    return res.json(classToClass(article));
  }
}
