import type { BaseFileSystemObject } from './base-file-system-object';

export type RecycleBin = BaseFileSystemObject & {
  type: 'recycle-bin';
};
