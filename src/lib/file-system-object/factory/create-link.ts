import type { Link } from '@types';
import { createBaseFileSystemObject } from './create-base-file-system-object';

export const createLink = ({
  parentId,
  label,
  iconSrc,
  position,
  url,
}: Pick<Link, 'parentId' | 'label' | 'iconSrc' | 'position' | 'url'>): Link => {
  return {
    ...createBaseFileSystemObject({
      type: 'link',
      parentId,
      label,
      iconSrc,
      position,
    }),
    url,
  };
};
