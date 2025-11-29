export interface StorageProvider {
  /**
   * Upload a file to storage
   * @param file - The file to upload
   * @param path - The destination path (relative to storage root)
   * @returns The URL or path to access the uploaded file
   */
  uploadFile(file: File | Buffer, path: string): Promise<string>;

  /**
   * Delete a file from storage
   * @param path - The path to the file to delete
   */
  deleteFile(path: string): Promise<void>;

  /**
   * Check if a file exists
   * @param path - The path to check
   */
  fileExists(path: string): Promise<boolean>;

  /**
   * Read a JSON file
   * @param path - The path to the file
   */
  readJsonFile<T>(path: string): Promise<T>;
}
