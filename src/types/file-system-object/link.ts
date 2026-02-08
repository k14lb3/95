import type { BaseFileSystemObject } from './base-file-system-object';

export type Link = BaseFileSystemObject & {
  type: 'link';
  url: string;
};
