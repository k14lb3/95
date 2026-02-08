import type { Folder as FolderType } from '@types';
import type { JSX } from 'react';
import { FileSystemObject, type FileSystemObjectProps } from '.';

type Props = {
  folder: FolderType;
} & Pick<
  FileSystemObjectProps,
  'isHighlighted' | 'isLastHighlighted' | 'onMouseDown'
>;

export const Folder = ({
  folder,
  isHighlighted,
  isLastHighlighted,
  onMouseDown,
}: Props): JSX.Element => {
  return (
    <FileSystemObject
      fileSystemObject={folder}
      isHighlighted={isHighlighted}
      isLastHighlighted={isLastHighlighted}
      onMouseDown={onMouseDown}
    />
  );
};
