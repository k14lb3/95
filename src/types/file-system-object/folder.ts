import type { BaseFileSystemObject } from './file-system-object';

export type Folder = BaseFileSystemObject & {
  type: 'folder';
};
