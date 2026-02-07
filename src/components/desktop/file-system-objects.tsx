import { getFileSystemObjectsByParentId } from '@lib';
import { useFileSystemObjectStoreState } from '@stores';
import { Fragment, type JSX } from 'react';
import { Folder } from './folder';
import { Link } from './link';
import { RecycleBin } from './recycle-bin';

export const FileSystemObjects = (): JSX.Element[] => {
  const fileSystemObjectStoreState = useFileSystemObjectStoreState();
  const desktopFileSystemObjects = getFileSystemObjectsByParentId({
    fileSystemObjects: fileSystemObjectStoreState.fileSystemObjects,
    parentId: 'desktop',
  });

  return desktopFileSystemObjects.map((fileSystemObject) => {
    return (
      <Fragment key={fileSystemObject.id}>
        {(() => {
          switch (fileSystemObject.type) {
            case 'link':
              return <Link link={fileSystemObject} />;
            case 'folder':
              return <Folder folder={fileSystemObject} />;
            case 'recycle-bin':
              return <RecycleBin recycleBin={fileSystemObject} />;
            default:
              return null;
          }
        })()}
      </Fragment>
    );
  });
};
