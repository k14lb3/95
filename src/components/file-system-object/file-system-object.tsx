import type { FileSystemObject as FileSystemObjectType } from '@types';
import type { JSX, MouseEvent } from 'react';
import { Folder } from './folder';
import { Link } from './link';
import { RecycleBin } from './recycle-bin';

export type FileSystemObjectProps = {
  showIndicators: boolean;
  fileSystemObject: FileSystemObjectType;
  isHighlighted: boolean;
  isLastHighlighted: boolean;
  onMouseDown: (mouseEvent: MouseEvent) => void;
};

export const FileSystemObject = ({
  showIndicators,
  fileSystemObject,
  isHighlighted,
  isLastHighlighted,
  onMouseDown,
}: FileSystemObjectProps): JSX.Element | null => {
  switch (fileSystemObject.type) {
    case 'link':
      return (
        <Link
          showIndicators={showIndicators}
          link={fileSystemObject}
          isHighlighted={isHighlighted}
          isLastHighlighted={isLastHighlighted}
          onMouseDown={onMouseDown}
        />
      );
    case 'folder':
      return (
        <Folder
          showIndicators={showIndicators}
          folder={fileSystemObject}
          isHighlighted={isHighlighted}
          isLastHighlighted={isLastHighlighted}
          onMouseDown={onMouseDown}
        />
      );
    case 'recycle-bin':
      return (
        <RecycleBin
          showIndicators={showIndicators}
          recycleBin={fileSystemObject}
          isLastHighlighted={isLastHighlighted}
          isHighlighted={isHighlighted}
          onMouseDown={onMouseDown}
        />
      );
    default:
      return null;
  }
};
