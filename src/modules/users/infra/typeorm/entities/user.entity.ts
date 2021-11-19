import UserModel from '@modules/users/interfaces/models/user.model';
import {
  Entity,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('users')
export default class UserEntity implements UserModel {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  avatar: string;

  @Column()
  name: string;

  @Column()
  email: string;

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
