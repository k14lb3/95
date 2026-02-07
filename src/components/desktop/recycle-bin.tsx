import type { RecycleBin as RecycleBinType } from '@types';
import type { JSX } from 'react';
import { FileSystemObject } from '../file-system-object';

type Props = {
  recycleBin: RecycleBinType;
};

export const RecycleBin = ({ recycleBin }: Props): JSX.Element => {
  return <FileSystemObject fileSystemObject={recycleBin} />;
};
