import envConfig from '@config/env.config';
import axios from 'axios';
import {
  ISendEmailProvider,
  ParamsSendEmailProviderDTO,
} from '../models/ISendEmailProvider';

export default class SendEmailProvider implements ISendEmailProvider {
  public async articleReviewRequest(
    params: ParamsSendEmailProviderDTO,
  ): Promise<void> {
    await axios.post(
      `${envConfig.url.internalMicroServices.notifications}/emails/send`,
      params,
    );
  }
}
