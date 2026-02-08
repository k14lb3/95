import type { RecycleBin as RecycleBinType } from '@types';
import type { JSX } from 'react';
import { FileSystemObject, type FileSystemObjectProps } from '.';

type Props = {
  recycleBin: RecycleBinType;
} & Pick<
  FileSystemObjectProps,
  'isHighlighted' | 'isLastHighlighted' | 'onMouseDown'
>;

export const RecycleBin = ({
  recycleBin,
  isHighlighted,
  isLastHighlighted,
  onMouseDown,
}: Props): JSX.Element => {
  return (
    <FileSystemObject
      fileSystemObject={recycleBin}
      isHighlighted={isHighlighted}
      isLastHighlighted={isLastHighlighted}
      onMouseDown={onMouseDown}
    />
  );
};
