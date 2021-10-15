export interface IDeleteFileStorageProvider {
  deleteFile(file: string): Promise<void>;
}
