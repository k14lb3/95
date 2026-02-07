import type { FileSystemObject } from '@types';

export const getFileSystemObjectsByParentId = ({
  fileSystemObjects,
  parentId,
}: {
  fileSystemObjects: FileSystemObject[];
  parentId: FileSystemObject['parentId'];
}) => {
  return fileSystemObjects.filter((fileSystemObject) => {
    return fileSystemObject.parentId === parentId;
  });
};
