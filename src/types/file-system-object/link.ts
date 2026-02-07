import type { BaseFileSystemObject } from './file-system-object';

export type Link = BaseFileSystemObject & {
  type: 'link';
  url: string;
};
