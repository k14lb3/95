import type { BaseFileSystemObject } from './file-system-object';

export type RecycleBin = BaseFileSystemObject & {
  type: 'recycle-bin';
};
