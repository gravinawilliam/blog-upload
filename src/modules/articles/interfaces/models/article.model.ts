import BaseModel from './_base.model';

export default class ArticleModel extends BaseModel {
  content?: string;

  status?: string;

  thumbnail?: string;

  reviewerId: string;
}
