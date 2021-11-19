import uploadConfig from '@config/upload.config';
import fs from 'fs';
import path from 'path';
import IStorageProvider, {
  IParamsDeleteFile,
  IParamsSaveFile,
  IResponseSaveFile,
} from '../models/IStorageProvider';

export default class DiskStorageProvider implements IStorageProvider {
  public async saveFile({ file }: IParamsSaveFile): Promise<IResponseSaveFile> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.uploadsFolder, file),
    );
    return { fileName: file, url: `http://localhost:2222${file}` };
  }

  public async deleteFile({ file }: IParamsDeleteFile): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolder, file);
    try {
      await fs.promises.stat(filePath);
    } catch {
      // eslint-disable-next-line no-useless-return
      return;
    }
    await fs.promises.unlink(filePath);
  }
}
