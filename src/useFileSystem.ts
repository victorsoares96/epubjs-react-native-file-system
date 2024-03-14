import { useCallback, useState } from 'react';
import RNFS from 'react-native-fs';
import type { FileSystem } from './types';

export function useFileSystem(): FileSystem {
  const [file, setFile] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [downloading, setDownloading] = useState<boolean>(false);
  const [size, setSize] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const downloadFile = useCallback((fromUrl: string, toFile: string) => {
    const toFilePath = `${RNFS.CachesDirectoryPath}/${toFile}`;

    return RNFS.downloadFile({
      fromUrl,
      toFile: toFilePath,
      begin: ({ contentLength }) => {
        setDownloading(true);
        setSize(contentLength);
      },
      progress: ({ bytesWritten, contentLength }) => {
        setProgress(Math.round((bytesWritten / contentLength) * 100));
      },
    })
      .promise.then(async ({ statusCode }) => {
        if (statusCode === 200) {
          const { path: filePath, size: fileSize } =
            await RNFS.stat(toFilePath);

          setFile(filePath);
          setSize(fileSize);
          setSuccess(true);
          setError(null);

          return { uri: filePath, mimeType: null };
        }

        setFile(null);
        setSize(0);
        setSuccess(false);
        setError(`Unknown error ${statusCode}`);

        return { uri: null, mimeType: null };
      })
      .catch((err) => {
        if (err instanceof Error) {
          setError(err.message);
        } else setError(`Unknown Error`);

        setFile(null);
        setSize(0);
        setSuccess(false);

        console.log(err);

        return { uri: null, mimeType: null };
      })
      .finally(() => setDownloading(false));
  }, []);

  const getFileInfo = useCallback(async (fileUri: string) => {
    const exists = await RNFS.exists(fileUri);
    const {
      path: uri,
      isDirectory: isDirectoryFn,
      size: fileSize,
    } = await RNFS.stat(fileUri);
    const isDirectory = isDirectoryFn();

    return {
      uri,
      exists,
      isDirectory,
      size: fileSize,
    };
  }, []);
  return {
    file,
    progress,
    downloading,
    size,
    error,
    success,
    documentDirectory: RNFS.DocumentDirectoryPath,
    bundleDirectory: RNFS.MainBundlePath,
    cacheDirectory: RNFS.CachesDirectoryPath,
    readAsStringAsync: (fileUri, options) =>
      RNFS.readFile(fileUri, options?.encoding),
    writeAsStringAsync: (fileUri, contents, options) =>
      RNFS.writeFile(fileUri, contents, options?.encoding),
    deleteAsync: (fileUri) => RNFS.unlink(fileUri),
    downloadFile,
    getFileInfo,
  };
}
