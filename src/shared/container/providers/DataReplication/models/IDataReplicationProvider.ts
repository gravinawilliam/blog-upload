import ArticleModel from '@modules/articles/interfaces/models/article.model';
import UserModel from '@modules/users/interfaces/models/user.model';

export interface IDataReplicationProvider {
  user(user: UserModel): Promise<void>;
  article(article: ArticleModel): Promise<void>;
}
