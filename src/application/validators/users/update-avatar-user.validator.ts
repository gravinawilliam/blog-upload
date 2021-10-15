import { IFindByIdUserRepository } from '@domain/repositories/users/find-by-id-user.repository';
import { IUpdateAvatarUserValidator } from '@domain/validators/users/update-avatar-user.validator';
import {
  IParamsUpdateAvatarUserValidatorDTO,
  IResponseUpdateAvatarUserValidatorDTO,
} from '@dtos/users/update-avatar-user.dto';
import { Either, left, right } from '@shared/utils/either';

import { NotFoundModelError } from '../../../shared/errors/not-found-model.error';
import { IHttpResponse } from '../../../shared/interfaces/http-response.interface';
import { notFound } from '../../../shared/utils/http-response';

export class UpdateAvatarUserValidator implements IUpdateAvatarUserValidator {
  constructor(private readonly usersRepository: IFindByIdUserRepository) {}

  public async execute({
    userId,
  }: IParamsUpdateAvatarUserValidatorDTO): Promise<
    Either<IHttpResponse, IResponseUpdateAvatarUserValidatorDTO>
  > {
    const validatedUser = await this.usersRepository.findById(userId);
    if (validatedUser.isLeft()) {
      return left(notFound(new NotFoundModelError('user')));
    }

    return right({
      user: validatedUser.value,
    });
  }
}
