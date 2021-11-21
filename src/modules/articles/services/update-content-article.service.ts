import envConfig from '@config/env.config';
import IUsersRepository from '@modules/users/interfaces/repositories/users.repository';
import { IDataReplicationProvider } from '@shared/container/providers/DataReplication/models/IDataReplicationProvider';
import { ISendEmailProvider } from '@shared/container/providers/SendEmailProvider/models/ISendEmailProvider';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import { IUpdateContentArticleDTO } from '../interfaces/dtos/update-content-article.dto';
import ArticleModel from '../interfaces/models/article.model';
import IArticlesRepository from '../interfaces/repositories/articles.repository';

@injectable()
export default class UpdateContentArticleService {
  constructor(
    @inject('ArticlesRepository')
    private articlesRepository: IArticlesRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
    @inject('DataReplication')
    private readonly dataReplications: IDataReplicationProvider,
    @inject('SendEmailProvider')
    private readonly sendEmailProvider: ISendEmailProvider,
  ) {}

  public async execute({
    content,
    articleId,
  }: IUpdateContentArticleDTO): Promise<ArticleModel> {
    const article = await this.articlesRepository.findById(articleId);

    if (article === undefined) {
      throw new AppError('Article not found', 404);
    }

    if (article.content) {
      await this.storageProvider.deleteFile({
        file: article.content,
        type: 'content',
      });
    }

    const { fileName, url } = await this.storageProvider.saveFile({
      file: content,
      type: 'content',
    });

    article.content = fileName;

    await this.articlesRepository.update(article);

    this.dataReplications.article({
      ...article,
      thumbnail: undefined,
      status:
        article.content !== null && article.thumbnail !== null
          ? 'reviewer-approval-pending'
          : 'pending',
      content: url,
    });

    const reviewer = await this.usersRepository.findById(article.reviewerId);

    if (reviewer === undefined) {
      throw new AppError('Reviewer not found', 404);
    }

    this.sendEmailProvider.articleReviewRequest({
      emailUser: reviewer.email,
      typeEmail: 'article-review-request',
      variables: {
        link: `${envConfig.url.externalMicroService.reviewingArticle}/${article.id}`,
        name: reviewer.name,
      },
    });

    return article;
  }
}
