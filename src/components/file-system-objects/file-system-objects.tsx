import type { FileSystemObject as FileSystemObjectType } from '@types';
import type { JSX, MouseEvent } from 'react';
import { FileSystemObject } from '../file-system-object/file-system-object';

type Props = {
  showIndicators: boolean;
  fileSystemObjects: FileSystemObjectType[];
  highlightedFileSystemObjectId: string | null;
  setHighlightedFileSystemObjectId: (
    highlightedFileSystemObjectId: string | null,
  ) => void;
  lastHighlightedFileSystemObjectId: string | null;
  setLastHighlightedFileSystemObjectId: (
    highlightedFileSystemObjectId: string | null,
  ) => void;
};

export const FileSystemObjects = ({
  showIndicators,
  fileSystemObjects,
  highlightedFileSystemObjectId,
  setHighlightedFileSystemObjectId,
  lastHighlightedFileSystemObjectId,
  setLastHighlightedFileSystemObjectId,
}: Props): JSX.Element[] => {
  return fileSystemObjects.map((fileSystemObject) => {
    const isHighlighted = highlightedFileSystemObjectId === fileSystemObject.id;
    const isLastHighlighted =
      lastHighlightedFileSystemObjectId === fileSystemObject.id;

    const handleMouseDown = (mouseEvent: MouseEvent): void => {
      mouseEvent.stopPropagation();
      setHighlightedFileSystemObjectId(fileSystemObject.id);
      setLastHighlightedFileSystemObjectId(fileSystemObject.id);
    };

    return (
      <FileSystemObject
        showIndicators={showIndicators}
        key={fileSystemObject.id}
        fileSystemObject={fileSystemObject}
        isHighlighted={isHighlighted}
        isLastHighlighted={isLastHighlighted}
        onMouseDown={handleMouseDown}
      />
    );
  });
};
