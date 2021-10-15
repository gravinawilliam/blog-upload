import { UserModel } from '@domain/models/user.model';

import { Either } from '../../../shared/utils/either';

export interface IFindByIdUserRepository {
  findById(id: string): Promise<Either<undefined, UserModel>>;
}
