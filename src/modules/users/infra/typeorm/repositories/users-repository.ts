import userModel from '@modules/users/interfaces/models/user.model';
import IUsersRepository from '@modules/users/interfaces/repositories/users.repository';
import { getRepository, Repository } from 'typeorm';
import UserEntity from '../entities/user.entity';

export default class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<UserEntity>;

  constructor() {
    this.ormRepository = getRepository(UserEntity);
  }

  public async findById(id: string): Promise<userModel | undefined> {
    const user = await this.ormRepository.findOne(id);
    return user;
  }

  public async update(data: userModel): Promise<userModel> {
    await this.ormRepository.save(data);
    return data;
  }
}
