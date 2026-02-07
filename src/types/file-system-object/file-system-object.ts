import type { FileSystemObjectType, Position } from '@types';
import type { DesktopId } from './desktop-id';

export type BaseFileSystemObject = {
  type: FileSystemObjectType;
  id: string;
  parentId: DesktopId | (string & {});
  label: string;
  iconSrc: string;
  position: Position;
};
