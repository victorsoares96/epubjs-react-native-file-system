export type FileSystem = {
  file: string | null;
  progress: number;
  downloading: boolean;
  size: number;
  error: string | null;
  success: boolean;
  /**
   * `file://` URI pointing to the directory where user documents for this app will be stored.
   * Files stored here will remain until explicitly deleted by the app. Ends with a trailing `/`.
   * Example uses are for files the user saves that they expect to see again.
   */
  documentDirectory: string | null;
  /**
   * `file://` URI pointing to the directory where temporary files used by this app will be stored.
   * Files stored here may be automatically deleted by the system when low on storage.
   * Example uses are for downloaded or generated files that the app just needs for one-time usage.
   */
  cacheDirectory: string | null;
  /**
   * URI to the directory where assets bundled with the application are stored.
   */
  bundleDirectory: string | null;
  readAsStringAsync: (
    fileUri: string,
    options?: {
      /**
       * The encoding format to use when reading the file.
       * @default 'utf8'
       */
      encoding?: 'utf8' | 'base64';
    }
  ) => Promise<string>;
  writeAsStringAsync: (
    fileUri: string,
    contents: string,
    options?: {
      /**
       * The encoding format to use when reading the file.
       * @default 'utf8'
       */
      encoding?: 'utf8' | 'base64';
    }
  ) => Promise<void>;
  deleteAsync: (fileUri: string) => Promise<void>;
  downloadFile: (
    fromUrl: string,
    toFile: string
  ) => Promise<{ uri: string | null; mimeType: string | null }>;
  getFileInfo: (fileUri: string) => Promise<{
    uri: string;
    exists: boolean;
    isDirectory: boolean;
    size: number | undefined;
  }>;
};
