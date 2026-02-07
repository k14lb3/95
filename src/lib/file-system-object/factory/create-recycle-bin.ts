import type { RecycleBin } from '@types';
import { createBaseFileSystemObject } from './create-base-file-system-object';

export const createRecycleBin = ({
  parentId,
  position,
}: Pick<RecycleBin, 'parentId' | 'position'>): RecycleBin => {
  return {
    ...createBaseFileSystemObject({
      type: 'recycle-bin',
      parentId,
      label: 'Recycle Bin',
      iconSrc: '/images/icons/recycle-bin.png',
      position,
    }),
  };
};
