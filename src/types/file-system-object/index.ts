export * from './desktop-id';
export * from './file-system-object';
export * from './file-system-object-type';
export * from './folder';
export * from './link';
export * from './recycle-bin';

import type { Folder } from './folder';
import type { Link } from './link';
import type { RecycleBin } from './recycle-bin';

export type FileSystemObject = Folder | Link | RecycleBin;
