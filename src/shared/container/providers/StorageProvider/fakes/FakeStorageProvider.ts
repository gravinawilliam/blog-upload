import IStorageProvider, {
  IParamsDeleteFile,
  IParamsSaveFile,
  IResponseSaveFile,
} from '../models/IStorageProvider';

export default class FakeStorageProvider implements IStorageProvider {
  private storage: string[] = [];

  public async saveFile({ file }: IParamsSaveFile): Promise<IResponseSaveFile> {
    this.storage.push(file);
    return { fileName: file, url: `http://localhost:2222${file}` };
  }

  public async deleteFile({ file }: IParamsDeleteFile): Promise<void> {
    const findIndex = this.storage.findIndex(
      storageFile => storageFile === file,
    );
    this.storage.splice(findIndex, 1);
  }
}
