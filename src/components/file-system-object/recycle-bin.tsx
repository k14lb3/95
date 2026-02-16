import type { RecycleBin as RecycleBinType } from '@types';
import type { JSX } from 'react';
import {
  BaseFileSystemObject,
  type BaseFileSystemObjectProps,
} from './base-file-system-object';

type Props = {
  recycleBin: RecycleBinType;
} & Omit<BaseFileSystemObjectProps, 'fileSystemObject'>;

export const RecycleBin = ({
  recycleBin,
  isHighlighted,
  isLastHighlighted,
  showIndicators,
  onMouseDown,
  onMouseUp,
}: Props): JSX.Element => {
  return (
    <BaseFileSystemObject
      fileSystemObject={recycleBin}
      isHighlighted={isHighlighted}
      isLastHighlighted={isLastHighlighted}
      showIndicators={showIndicators}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    />
  );
};
