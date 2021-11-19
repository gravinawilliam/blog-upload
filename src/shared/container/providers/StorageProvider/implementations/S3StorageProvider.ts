import uploadConfig from '@config/upload.config';
import aws, { S3 } from 'aws-sdk';
import fs from 'fs';
import mime from 'mime';
import path from 'path';
import IStorageProvider, {
  IParamsDeleteFile,
  IParamsSaveFile,
  IResponseSaveFile,
} from '../models/IStorageProvider';

export default class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: 'us-east-1',
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }

  private selectBucket(type: string): string {
    switch (type) {
      case 'avatar':
        return uploadConfig.config.aws.bucket.avatar;
      case 'content':
        return uploadConfig.config.aws.bucket.content;
      case 'thumbnail':
        return uploadConfig.config.aws.bucket.thumbnail;
      default:
        return '';
    }
  }

  public async saveFile({
    file,
    type,
  }: IParamsSaveFile): Promise<IResponseSaveFile> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file);
    const ContentType = mime.getType(originalPath);
    if (!ContentType) throw new Error('File not found');
    const fileContent = await fs.promises.readFile(originalPath);

    await this.client
      .putObject({
        Bucket: this.selectBucket(type),
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
        ContentType,
        ContentDisposition: `inline; filename=${file}`,
      })
      .promise();
    await fs.promises.unlink(originalPath);
    return {
      fileName: file,
      url: `https://${this.selectBucket(type)}.s3.amazonaws.com/${file}`,
    };
  }

  public async deleteFile({ file, type }: IParamsDeleteFile): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: this.selectBucket(type),
        Key: file,
      })
      .promise();
  }
}
