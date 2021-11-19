import multer, { StorageEngine } from 'multer';
import path from 'path';
import crypto from 'crypto';

const tmpFolder = path.resolve(__dirname, '..', '..', 'temp');

interface IUploadConfig {
  driver: 's3' | 'disk';
  tmpFolder: string;
  uploadsFolder: string;
  multer: {
    storage: StorageEngine;
  };
  config: {
    // eslint-disable-next-line @typescript-eslint/ban-types
    disk: {};
    aws: {
      bucket: {
        content: string;
        thumbnail: string;
        avatar: string;
      };
    };
  };
}

export default {
  driver: process.env.STORAGE_DRIVER,
  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),
  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(req, file, cb) {
        const fileHash = crypto.randomBytes(10).toString('hex');
        let fileName = `${fileHash}-${file.originalname}`;
        fileName = fileName.replace(/\s/g, '');
        return cb(null, fileName);
      },
    }),
  },
  config: {
    disk: {},
    aws: {
      bucket: {
        content: process.env.AWS_S3_BUCKET_CONTENT,
        thumbnail: process.env.AWS_S3_BUCKET_THUMBNAIL,
        avatar: process.env.AWS_S3_BUCKET_AVATAR,
      },
    },
  },
} as IUploadConfig;
