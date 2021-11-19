import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import UpdateContentArticleService from '@modules/articles/services/update-content-article.service';

export default class UpdateContentArticleController {
  public async execute(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(UpdateContentArticleService);
    const article = await service.execute({
      articleId: req.params.article_id,
      content: req.file?.filename ?? '',
    });
    return res.json(classToClass(article));
  }
}
