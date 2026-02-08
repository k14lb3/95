import type { Folder as FolderType } from '@types';
import type { JSX } from 'react';
import {
  BaseFileSystemObject,
  type BaseFileSystemObjectProps,
} from './base-file-system-object';

type Props = {
  folder: FolderType;
} & Pick<
  BaseFileSystemObjectProps,
  'isHighlighted' | 'isLastHighlighted' | 'onMouseDown'
>;

export const Folder = ({
  folder,
  isHighlighted,
  isLastHighlighted,
  onMouseDown,
}: Props): JSX.Element => {
  return (
    <BaseFileSystemObject
      fileSystemObject={folder}
      isHighlighted={isHighlighted}
      isLastHighlighted={isLastHighlighted}
      onMouseDown={onMouseDown}
    />
  );
};
