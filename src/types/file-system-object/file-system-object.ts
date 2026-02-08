import type { Folder } from './folder';
import type { Link } from './link';
import type { RecycleBin } from './recycle-bin';

export type FileSystemObject = Folder | Link | RecycleBin;
