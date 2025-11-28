export interface StorageService {
  uploadFile(file: File | Blob, path: string): Promise<string>;
  deleteFile(path: string): Promise<void>;
  getFileUrl(path: string): string;
}
