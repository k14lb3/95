import type { FileSystemObject } from '@types';
import { createLocalStorageRepo } from './storage-repo';

export const localStorageRepo = {
  fileSystemObjects: createLocalStorageRepo<FileSystemObject[]>({
    key: 'file-system-objects',
  }),
};
