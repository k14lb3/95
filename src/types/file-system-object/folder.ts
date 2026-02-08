import type { BaseFileSystemObject } from './base-file-system-object';

export type Folder = BaseFileSystemObject & {
  type: 'folder';
};
