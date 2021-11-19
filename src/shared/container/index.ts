import ArticlesRepository from '@modules/articles/infra/typeorm/repositories/articles-repository';
import IArticlesRepository from '@modules/articles/interfaces/repositories/articles.repository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/users-repository';
import IUsersRepository from '@modules/users/interfaces/repositories/users.repository';
import { container } from 'tsyringe';
import './providers';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IArticlesRepository>(
  'ArticlesRepository',
  ArticlesRepository,
);
