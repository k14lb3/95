import { openUrlInNewTab } from '@lib';
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
  'isHighlighted' | 'isLastHighlighted' | 'showIndicators' | 'onMouseDown'
>;

export const Link = ({
  link,
  isHighlighted,
  isLastHighlighted,
  showIndicators,
  onMouseDown,
}: Props): JSX.Element => {
  const handleDoubleClick = (): void => {
    console.log('opening');
    openUrlInNewTab(link);
  };

  return (
    <BaseFileSystemObject
      fileSystemObject={link}
      isHighlighted={isHighlighted}
      isLastHighlighted={isLastHighlighted}
      showIndicators={showIndicators}
      onMouseDown={onMouseDown}
      onDoubleClick={handleDoubleClick}
    />
  );
};
