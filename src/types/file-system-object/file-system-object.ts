import type { FileSystemObjectType, Position } from '@types';

export type BaseFileSystemObject = {
  type: FileSystemObjectType;
  id: string;
  parentId: 'desktop' | (string & {});
  label: string;
  iconSrc: string;
  position: Position;
};
