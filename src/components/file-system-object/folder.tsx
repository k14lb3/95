import type { Folder as FolderType } from '@types';
import type { JSX } from 'react';
import {
  BaseFileSystemObject,
  type BaseFileSystemObjectProps,
} from './base-file-system-object';

type Props = {
  folder: FolderType;
} & Omit<BaseFileSystemObjectProps, 'fileSystemObject'>;

export const Folder = ({
  folder,
  isHighlighted,
  isLastHighlighted,
  showIndicators,
  onMouseDown,
  onMouseUp,
}: Props): JSX.Element => {
  return (
    <BaseFileSystemObject
      fileSystemObject={folder}
      isHighlighted={isHighlighted}
      isLastHighlighted={isLastHighlighted}
      showIndicators={showIndicators}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    />
  );
};
