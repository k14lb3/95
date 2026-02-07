import { pxToVh } from '@lib';
import { color } from '@stylex/color.stylex.ts';
import { px } from '@stylex/px.stylex.ts';
import * as stylex from '@stylexjs/stylex';
import type { FileSystemObject as FileSystemObjectType } from '@types';
import Image from 'next/image';
import type { JSX } from 'react';

type Props = {
  fileSystemObject: FileSystemObjectType;
};

const styles = stylex.create({
  fileSystemObject: {
    position: 'absolute',
    width: 'fit-content',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: color.white,
  },
  icon: {
    height: px[32],
    position: 'relative',
    aspectRatio: '1/1',
  },
  label: {
    paddingHorizontal: px[4],
    marginTop: px[4],
    borderWidth: px[1],
    borderStyle: 'dotted',
    borderColor: color.transparent,
    fontSize: px[12],
  },
});

export const FileSystemObject = ({ fileSystemObject }: Props): JSX.Element => {
  return (
    <div
      {...stylex.props(styles.fileSystemObject)}
      style={{
        left: pxToVh({ px: fileSystemObject.position.x }),
        top: pxToVh({ px: fileSystemObject.position.y }),
      }}
    >
      <div {...stylex.props(styles.icon)}>
        <Image
          src={fileSystemObject.iconSrc}
          alt={fileSystemObject.label}
          fill={true}
        />
      </div>
      <div {...stylex.props(styles.label)}>{fileSystemObject.label}</div>
    </div>
  );
};
