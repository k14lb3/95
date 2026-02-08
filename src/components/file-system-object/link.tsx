import type { Link as LinkType } from '@types';
import type { JSX } from 'react';
import {
  BaseFileSystemObject,
  type BaseFileSystemObjectProps,
} from './base-file-system-object';

type Props = {
  link: LinkType;
} & Pick<
  BaseFileSystemObjectProps,
  'isHighlighted' | 'isLastHighlighted' | 'onMouseDown'
>;

export const Link = ({
  link,
  isHighlighted,
  isLastHighlighted,
  onMouseDown,
}: Props): JSX.Element => {
  return (
    <BaseFileSystemObject
      fileSystemObject={link}
      isHighlighted={isHighlighted}
      isLastHighlighted={isLastHighlighted}
      onMouseDown={onMouseDown}
    />
  );
};
