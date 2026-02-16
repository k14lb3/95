import type { RecycleBin as RecycleBinType } from '@types';
import type { JSX } from 'react';
import {
  BaseFileSystemObject,
  type BaseFileSystemObjectProps,
} from './base-file-system-object';

type Props = {
  recycleBin: RecycleBinType;
} & Pick<
  BaseFileSystemObjectProps,
  'isHighlighted' | 'isLastHighlighted' | 'showIndicators' | 'onMouseDown'
>;

export const RecycleBin = ({
  recycleBin,
  isHighlighted,
  isLastHighlighted,
  showIndicators,
  onMouseDown,
}: Props): JSX.Element => {
  return (
    <BaseFileSystemObject
      fileSystemObject={recycleBin}
      isHighlighted={isHighlighted}
      isLastHighlighted={isLastHighlighted}
      showIndicators={showIndicators}
      onMouseDown={onMouseDown}
    />
  );
};
