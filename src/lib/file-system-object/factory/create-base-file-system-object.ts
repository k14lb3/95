import { generateId } from '@lib';
import type { BaseFileSystemObject, FileSystemObjectType } from '@types';

export const createBaseFileSystemObject = <T extends FileSystemObjectType>({
  type,
  parentId,
  label,
  iconSrc,
  position = { x: 0, y: 0 },
}: Omit<BaseFileSystemObject, 'id'> & { type: T }): Omit<
  BaseFileSystemObject,
  'type'
> & {
  type: T;
} => {
  return {
    type,
    id: generateId(),
    parentId,
    label,
    iconSrc,
    position,
  };
};
