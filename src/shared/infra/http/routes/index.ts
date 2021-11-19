import { Router } from 'express';
import users from '@modules/users/infra/http/routes/users.route';
import articles from '@modules/articles/infra/http/routes/articles.route';

const routes = Router();

routes.use('/users', users);
routes.use('/articles', articles);

export default routes;
