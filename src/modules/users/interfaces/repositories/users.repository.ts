import UserModel from '../models/user.model';

export default interface IUsersRepository {
  update(data: UserModel): Promise<UserModel>;
  findById(id: string): Promise<UserModel | undefined>;
}
