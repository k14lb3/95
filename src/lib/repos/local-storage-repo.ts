import type { FileSystemObject } from '@types';
import { createLocalStorageRepo } from './storage-repo';

export const localStorageRepo = {
  firstVisitAtEpochMs: createLocalStorageRepo<string>({
    key: 'first-visit-at-epoch-ms',
  }),
  fileSystemObjects: createLocalStorageRepo<FileSystemObject[]>({
    key: 'file-system-objects',
  }),
};
