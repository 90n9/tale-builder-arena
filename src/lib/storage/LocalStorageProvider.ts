import { StorageService } from './StorageService';
import fs from 'fs/promises';
import path from 'path';

export class LocalStorageProvider implements StorageService {
  private uploadDir: string;
  private publicUrlBase: string;

  constructor() {
    this.uploadDir = path.join(process.cwd(), 'public', 'uploads');
    this.publicUrlBase = '/uploads';
  }

  async uploadFile(file: File | Blob, filePath: string): Promise<string> {
    const buffer = Buffer.from(await file.arrayBuffer());
    const fullPath = path.join(this.uploadDir, filePath);
    
    // Ensure directory exists
    await fs.mkdir(path.dirname(fullPath), { recursive: true });
    
    await fs.writeFile(fullPath, buffer);
    
    return this.getFileUrl(filePath);
  }

  async deleteFile(filePath: string): Promise<void> {
    const fullPath = path.join(this.uploadDir, filePath);
    try {
      await fs.unlink(fullPath);
    } catch (error) {
      // Ignore if file doesn't exist
      console.error(`Failed to delete file ${fullPath}:`, error);
    }
  }

  getFileUrl(filePath: string): string {
    // Ensure no leading slash in filePath to avoid double slashes
    const cleanPath = filePath.startsWith('/') ? filePath.slice(1) : filePath;
    return `${this.publicUrlBase}/${cleanPath}`;
  }
}
