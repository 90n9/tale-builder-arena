import { StorageProvider } from '@/server/ports/storage';
import fs from 'fs/promises';
import path from 'path';

export class LocalStorage implements StorageProvider {
  private uploadDir: string;
  private publicUrlBase: string;

  constructor() {
    this.uploadDir = path.join(process.cwd(), 'public', 'uploads');
    this.publicUrlBase = '/uploads';
  }

  async uploadFile(file: File | Buffer, filePath: string): Promise<string> {
    let buffer: Buffer;
    if (Buffer.isBuffer(file)) {
      buffer = file;
    } else {
      buffer = Buffer.from(await (file as unknown as File).arrayBuffer());
    }

    const fullPath = path.join(this.uploadDir, filePath);

    // Ensure directory exists
    await fs.mkdir(path.dirname(fullPath), { recursive: true });

    await fs.writeFile(fullPath, buffer);

    // Ensure no leading slash in filePath to avoid double slashes
    const cleanPath = filePath.startsWith('/') ? filePath.slice(1) : filePath;
    return `${this.publicUrlBase}/${cleanPath}`;
  }

  async deleteFile(filePath: string): Promise<void> {
    // filePath might be a URL like /uploads/stories/..., we need to extract relative path
    let relativePath = filePath;
    if (filePath.startsWith(this.publicUrlBase)) {
      relativePath = filePath.slice(this.publicUrlBase.length);
    }
    // Remove leading slash
    if (relativePath.startsWith('/')) {
      relativePath = relativePath.slice(1);
    }

    const fullPath = path.join(this.uploadDir, relativePath);
    try {
      await fs.unlink(fullPath);
    } catch (error) {
      // Ignore if file doesn't exist
      console.error(`Failed to delete file ${fullPath}:`, error);
    }
  }

  async fileExists(filePath: string): Promise<boolean> {
    try {
      // filePath might be a URL like /uploads/stories/..., we need to extract relative path
      let relativePath = filePath;
      if (filePath.startsWith(this.publicUrlBase)) {
        relativePath = filePath.slice(this.publicUrlBase.length);
      }
      // Remove leading slash
      if (relativePath.startsWith('/')) {
        relativePath = relativePath.slice(1);
      }
      const fullPath = path.join(this.uploadDir, relativePath);
      await fs.access(fullPath);
      return true;
    } catch {
      return false;
    }
  }

  async readJsonFile<T>(filePath: string): Promise<T> {
    // filePath might be a URL like /uploads/stories/..., we need to extract relative path
    let relativePath = filePath;
    if (filePath.startsWith(this.publicUrlBase)) {
      relativePath = filePath.slice(this.publicUrlBase.length);
    }
    // Remove leading slash
    if (relativePath.startsWith('/')) {
      relativePath = relativePath.slice(1);
    }

    const fullPath = path.join(this.uploadDir, relativePath);
    const content = await fs.readFile(fullPath, 'utf-8');
    return JSON.parse(content) as T;
  }
}
