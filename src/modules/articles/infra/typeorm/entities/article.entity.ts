import ArticleModel from '@modules/articles/interfaces/models/article.model';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity('articles')
export default class ArticleEntity implements ArticleModel {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  thumbnail?: string;

  @Column()
  content?: string;

  @Column()
  reviewerId: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
  })
  deletedAt: Date;
}
