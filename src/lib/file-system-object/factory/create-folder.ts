import type { Folder } from '@types';
import { createBaseFileSystemObject } from './create-base-file-system-object';

export const createFolder = ({
  parentId,
  label,
  position,
}: Pick<Folder, 'parentId' | 'label' | 'position'>): Folder => {
  return {
    ...createBaseFileSystemObject({
      type: 'folder',
      parentId,
      label,
      iconSrc: '/images/icons/folder.png',
      position,
    }),
  };
};
