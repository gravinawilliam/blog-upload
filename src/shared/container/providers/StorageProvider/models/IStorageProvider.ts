export type IParamsSaveFile = {
  file: string;
  type: string;
};

export type IParamsDeleteFile = {
  file: string;
  type: string;
};

export type IResponseSaveFile = {
  fileName: string;
  url: string;
};

export default interface IStorageProvider {
  saveFile(params: IParamsSaveFile): Promise<IResponseSaveFile>;
  deleteFile(params: IParamsDeleteFile): Promise<void>;
}
