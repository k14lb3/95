import type { FileSystemObject } from '@types';
import { Fragment, type JSX, type MouseEvent } from 'react';
import { Folder } from '../file-system-object/folder';
import { Link } from '../file-system-object/link';
import { RecycleBin } from '../file-system-object/recycle-bin';

type Props = {
  fileSystemObjects: FileSystemObject[];
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

    const onMouseDown = (mouseEvent: MouseEvent): void => {
      mouseEvent.stopPropagation();
      setHighlightedFileSystemObjectId(fileSystemObject.id);
      setLastHighlightedFileSystemObjectId(fileSystemObject.id);
    };

    console.log({
      highlightedFileSystemObjectId,
      lastHighlightedFileSystemObjectId,
    });

    return (
      <Fragment key={fileSystemObject.id}>
        {(() => {
          switch (fileSystemObject.type) {
            case 'link':
              return (
                <Link
                  link={fileSystemObject}
                  isHighlighted={isHighlighted}
                  isLastHighlighted={isLastHighlighted}
                  onMouseDown={onMouseDown}
                />
              );
            case 'folder':
              return (
                <Folder
                  folder={fileSystemObject}
                  isHighlighted={isHighlighted}
                  isLastHighlighted={isLastHighlighted}
                  onMouseDown={onMouseDown}
                />
              );
            case 'recycle-bin':
              return (
                <RecycleBin
                  recycleBin={fileSystemObject}
                  isLastHighlighted={isLastHighlighted}
                  isHighlighted={isHighlighted}
                  onMouseDown={onMouseDown}
                />
              );
            default:
              return null;
          }
        })()}
      </Fragment>
    );
  });
};
