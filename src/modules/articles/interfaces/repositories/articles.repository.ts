import ArticleModel from '../models/article.model';

export default interface IArticlesRepository {
  update(params: ArticleModel): Promise<ArticleModel>;
  findById(id: string): Promise<ArticleModel | undefined>;
}
