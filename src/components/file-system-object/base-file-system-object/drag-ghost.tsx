import { color } from '@stylex/color.stylex.ts';
import { px } from '@stylex/px.stylex.ts';
import * as stylex from '@stylexjs/stylex';
import type { FileSystemObject as FileSystemObjectType } from '@types';
import Image from 'next/image';
import type { CSSProperties, JSX, MouseEvent } from 'react';

export type BaseFileSystemObjectProps = {
  fileSystemObject: FileSystemObjectType;
  style?: CSSProperties;
  onMouseUp?: (mouseEvent: MouseEvent) => void;
};

const styles = stylex.create({
  fileSystemObject: {
    position: 'absolute',
    width: 'fit-content',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  icon: {
    height: px[32],
    position: 'relative',
    aspectRatio: '1/1',
    opacity: 0.5,
  },
  iconImageMask: {
    position: 'absolute',
    inset: 0,
    maskRepeat: 'no-repeat',
    WebkitMaskRepeat: 'no-repeat',
    maskSize: px[32],
    WebkitMaskSize: px[32],
    backgroundImage: `
      repeating-linear-gradient(45deg, ${color.blue} 0%, ${color.blue} 25%, ${color.transparent} 25%, ${color.transparent} 50%)
    `,
    backgroundSize: '0.2vh 0.2vh',
    opacity: 0.5,
  },
  label: {
    padding: px[1],
    marginTop: px[4],
    borderWidth: px[1],
    fontSize: px[12],
    color: color.black,
    whiteSpace: 'nowrap',
  },
});

export const DragGhost = ({
  style,
  fileSystemObject,
  onMouseUp,
}: BaseFileSystemObjectProps): JSX.Element => {
  return (
    <div
      {...stylex.props(styles.fileSystemObject)}
      style={style}
      onMouseUp={onMouseUp}
    >
      <div {...stylex.props(styles.icon)}>
        <Image
          src={fileSystemObject.iconSrc}
          alt={fileSystemObject.label}
          fill={true}
        />
        <div
          {...stylex.props(styles.iconImageMask)}
          style={{
            maskImage: `url(${fileSystemObject.iconSrc})`,
            WebkitMaskImage: `url(${fileSystemObject.iconSrc})`,
          }}
        />
      </div>
      <div {...stylex.props(styles.label)}>{fileSystemObject.label}</div>
    </div>
  );
};
