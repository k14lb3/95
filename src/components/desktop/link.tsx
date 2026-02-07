import type { Link as LinkType } from '@types';
import type { JSX } from 'react';
import { FileSystemObject } from '../file-system-object';

type Props = {
  link: LinkType;
};

export const Link = ({ link }: Props): JSX.Element => {
  return <FileSystemObject fileSystemObject={link} />;
};
