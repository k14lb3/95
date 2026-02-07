import { BASE_VIEWPORT_HEIGHT } from '@constants';
import { useMousePosition } from '@hooks';
import { pxToVh } from '@lib';
import {
  useDragStoreAction,
  useDragStoreState,
  useFileSystemObjectStoreAction,
} from '@stores';
import { color } from '@stylex/color.stylex.ts';
import { px } from '@stylex/px.stylex.ts';
import * as stylex from '@stylexjs/stylex';
import type { FileSystemObject as FileSystemObjectType } from '@types';
import Image from 'next/image';
import { type JSX, useEffect, useRef } from 'react';

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
  const dragStoreAction = useDragStoreAction();
  const dragStoreState = useDragStoreState();

  const fileSystemObjectStore = useFileSystemObjectStoreAction();
  const mousePosition = useMousePosition();
  const containerRef = useRef<HTMLDivElement>(null);
  const grabOffsetRef = useRef({ x: 0, y: 0 });

  const onMouseDown = (event: React.MouseEvent): void => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const containerRect = container.getBoundingClientRect();
    grabOffsetRef.current = {
      x: event.clientX - containerRect.left,
      y: event.clientY - containerRect.top,
    };

    dragStoreAction.drag({ id: fileSystemObject.id });
  };

  useEffect(() => {
    if (dragStoreState.draggedId !== fileSystemObject.id) {
      return;
    }

    const viewportToDesignScale = globalThis.innerHeight / BASE_VIEWPORT_HEIGHT;

    fileSystemObjectStore.move({
      fileSystemObjectId: fileSystemObject.id,
      position: {
        x: (mousePosition.x - grabOffsetRef.current.x) / viewportToDesignScale,
        y: (mousePosition.y - grabOffsetRef.current.y) / viewportToDesignScale,
      },
    });
  }, [
    mousePosition.x,
    mousePosition.y,
    dragStoreState.draggedId,
    fileSystemObject.id,
    fileSystemObjectStore,
  ]);

  return (
    <div
      {...stylex.props(styles.fileSystemObject)}
      ref={containerRef}
      style={{
        left: pxToVh({ px: fileSystemObject.position.x }),
        top: pxToVh({ px: fileSystemObject.position.y }),
      }}
      onMouseDown={onMouseDown}
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
