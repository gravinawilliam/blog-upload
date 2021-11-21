import { IDataReplicationProvider } from '@shared/container/providers/DataReplication/models/IDataReplicationProvider';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import { IUpdateThumbnailArticleDTO } from '../interfaces/dtos/update-content-article.dto';
import ArticleModel from '../interfaces/models/article.model';
import IArticlesRepository from '../interfaces/repositories/articles.repository';

@injectable()
export default class UpdateThumbnailArticleService {
  constructor(
    @inject('ArticlesRepository')
    private articlesRepository: IArticlesRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
    @inject('DataReplication')
    private readonly dataReplications: IDataReplicationProvider,
  ) {}

  public async execute({
    thumbnail,
    articleId,
  }: IUpdateThumbnailArticleDTO): Promise<ArticleModel> {
    const article = await this.articlesRepository.findById(articleId);

    if (!article) {
      throw new AppError('Article not found', 404);
    }

    if (article.thumbnail) {
      await this.storageProvider.deleteFile({
        file: article.thumbnail,
        type: 'thumbnail',
      });
    }

    const { fileName, url } = await this.storageProvider.saveFile({
      file: thumbnail,
      type: 'thumbnail',
    });

    article.thumbnail = fileName;

    await this.articlesRepository.update(article);

    this.dataReplications.article({
      ...article,
      content: undefined,
      status:
        article.content !== null && article.thumbnail !== null
          ? 'reviewer-approval-pending'
          : 'pending',
      thumbnail: url,
    });

    return article;
  }
}
