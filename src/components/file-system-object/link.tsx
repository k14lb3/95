import type { Link as LinkType } from '@types';
import type { JSX } from 'react';
import {
  FileSystemObject,
  type FileSystemObjectProps,
} from './file-system-object';

type Props = {
  link: LinkType;
} & Pick<
  FileSystemObjectProps,
  'isHighlighted' | 'isLastHighlighted' | 'onMouseDown'
>;

export const Link = ({
  link,
  isHighlighted,
  isLastHighlighted,
  onMouseDown,
}: Props): JSX.Element => {
  return (
    <FileSystemObject
      fileSystemObject={link}
      isHighlighted={isHighlighted}
      isLastHighlighted={isLastHighlighted}
      onMouseDown={onMouseDown}
    />
  );
};
