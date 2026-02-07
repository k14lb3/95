import { createFolder } from './create-folder';
import { createLink } from './create-link';
import { createRecycleBin } from './create-recycle-bin';

export const fileSystemObjectFactory = {
  createFolder,
  createLink,
  createRecycleBin,
} as const;
