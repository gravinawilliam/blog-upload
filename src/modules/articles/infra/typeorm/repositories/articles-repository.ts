import ArticleModel from '@modules/articles/interfaces/models/article.model';
import IArticlesRepository from '@modules/articles/interfaces/repositories/articles.repository';
import { getRepository, Repository } from 'typeorm';
import ArticleEntity from '../entities/article.entity';

export default class ArticlesRepository implements IArticlesRepository {
  private ormRepository: Repository<ArticleEntity>;

  constructor() {
    this.ormRepository = getRepository(ArticleEntity);
  }

  public async update(params: ArticleModel): Promise<ArticleModel> {
    const article = await this.ormRepository.save(params);
    return article;
  }

  public async findById(id: string): Promise<ArticleModel | undefined> {
    const found = await this.ormRepository.findOne({
      where: {
        id,
      },
    });
    return found;
  }
}
