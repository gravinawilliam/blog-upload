export interface ISaveFileStorageProvider {
  saveFile(file: string): Promise<string>;
}
