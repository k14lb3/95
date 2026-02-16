import { useFocusedStoreAction, useFocusedStoreState } from '@stores';
import type { FileSystemObject as FileSystemObjectType } from '@types';
import type { JSX, MouseEvent } from 'react';
import { FileSystemObject } from '../file-system-object/file-system-object';

type Props = {
  parentId: FileSystemObjectType['parentId'];
  fileSystemObjects: FileSystemObjectType[];
  highlightedFileSystemObjectId: string | null;
  setHighlightedFileSystemObjectId: (
    highlightedFileSystemObjectId: string | null,
  ) => void;
  lastHighlightedFileSystemObjectId: string | null;
  setLastHighlightedFileSystemObjectId: (
    highlightedFileSystemObjectId: string | null,
  ) => void;
  onMouseUp: (mouseEvent: MouseEvent) => void;
};

export const FileSystemObjects = ({
  parentId,
  fileSystemObjects,
  highlightedFileSystemObjectId,
  setHighlightedFileSystemObjectId,
  lastHighlightedFileSystemObjectId,
  setLastHighlightedFileSystemObjectId,
}: Props): JSX.Element[] => {
  const focusedStoreState = useFocusedStoreState();
  const focusedStoreAction = useFocusedStoreAction();

  const shouldShowIndicators = focusedStoreState.focusedId === parentId;

  const handleMouseUp = (): void => {
    if (focusedStoreState.focusedId !== parentId) {
      focusedStoreAction.focus({ focusedId: parentId });
    }
  };

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
        showIndicators={shouldShowIndicators}
        key={fileSystemObject.id}
        fileSystemObject={fileSystemObject}
        isHighlighted={isHighlighted}
        isLastHighlighted={isLastHighlighted}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      />
    );
  });
};
