import { IController } from '@shared/interfaces/controller.interface';
import { IHttpRequest } from '@shared/interfaces/http-request.interface';
import { IHttpResponse } from '@shared/interfaces/http-response.interface';

export class UpdateAvatarUserController implements IController {
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    console.log({ httpRequest });

    return {
      body: 'true',
      statusCode: 200,
    };
  }
}
