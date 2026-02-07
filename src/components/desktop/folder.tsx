import type { Folder as FolderType } from '@types';
import type { JSX } from 'react';
import { FileSystemObject } from '../file-system-object';

type Props = {
  folder: FolderType;
};

export const Folder = ({ folder }: Props): JSX.Element => {
  return <FileSystemObject fileSystemObject={folder} />;
};
