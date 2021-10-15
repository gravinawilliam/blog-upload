import {
  IParamsUpdateAvatarUserValidatorDTO,
  IResponseUpdateAvatarUserValidatorDTO,
} from '@dtos/users/update-avatar-user.dto';
import { IHttpResponse } from '@shared/interfaces/http-response.interface';

import { Either } from '../../../shared/utils/either';

export interface IUpdateAvatarUserValidator {
  execute(
    params: IParamsUpdateAvatarUserValidatorDTO,
  ): Promise<Either<IHttpResponse, IResponseUpdateAvatarUserValidatorDTO>>;
}
