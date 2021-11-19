import envConfig from '@config/env.config';
import ArticleModel from '@modules/articles/interfaces/models/article.model';
import UserModel from '@modules/users/interfaces/models/user.model';
import axios from 'axios';
import { IDataReplicationProvider } from '../models/IDataReplicationProvider';

export default class DataReplication implements IDataReplicationProvider {
  public async article(article: ArticleModel): Promise<void> {
    await axios.post(
      `${envConfig.url.internalMicroServices.dataReplication}/article`,
      {
        article,
        type: 'update',
        producer: 'blog-upload',
        key: envConfig.dataReplication.key,
      },
    );
  }

  public async user(user: UserModel): Promise<void> {
    await axios.post(
      `${envConfig.url.internalMicroServices.dataReplication}/user`,
      {
        user,
        type: 'update',
        producer: 'blog-upload',
        key: envConfig.dataReplication.key,
      },
    );
  }
}
