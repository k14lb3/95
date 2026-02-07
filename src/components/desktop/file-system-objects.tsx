import { useFileSystemObjectStore } from '@stores';
import { Fragment, type JSX } from 'react';
import { Folder } from './folder';
import { Link } from './link';
import { RecycleBin } from './recycle-bin';

export const FileSystemObjects = (): JSX.Element[] => {
  const fileSystemObjectStore = useFileSystemObjectStore();

  return fileSystemObjectStore
    .getAllByParentId({ parentId: 'desktop' })
    .map((fileSystemObject) => {
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
