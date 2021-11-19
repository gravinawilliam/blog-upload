export type ParamsSendEmailProviderDTO = {
  emailUser: string;
  typeEmail: string;
  variables: unknown;
};

export interface ISendEmailProvider {
  articleReviewRequest(params: ParamsSendEmailProviderDTO): Promise<void>;
}
