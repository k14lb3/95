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
import { type JSX, type MouseEvent, useEffect, useRef } from 'react';

export type BaseFileSystemObjectProps = {
  fileSystemObject: FileSystemObjectType;
  isHighlighted: boolean;
  isLastHighlighted: boolean;
  onMouseDown: (mouseEvent: MouseEvent) => void;
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
  iconImageMask: {
    position: 'absolute',
    opacity: '70%',
    inset: 0,
    backgroundColor: color.blue,
    maskRepeat: 'no-repeat',
    WebkitMaskRepeat: 'no-repeat',
    maskSize: px[32],
    WebkitMaskSize: px[32],
  },
  label: {
    padding: px[1],
    marginTop: px[4],
    borderWidth: px[1],
    borderStyle: 'dotted',
    borderColor: color.transparent,
    fontSize: px[12],
  },
  labelHighlighted: {
    borderColor: color.yellow,
    backgroundColor: color.blue,
  },
  labelLastHighlighted: {
    borderColor: color.yellow,
  },
});

export const BaseFileSystemObject = ({
  fileSystemObject,
  isHighlighted,
  isLastHighlighted,
  onMouseDown: onMouseDownCallback,
}: BaseFileSystemObjectProps): JSX.Element => {
  const dragStoreAction = useDragStoreAction();
  const dragStoreState = useDragStoreState();

  const fileSystemObjectStore = useFileSystemObjectStoreAction();
  const mousePosition = useMousePosition();
  const containerRef = useRef<HTMLDivElement>(null);
  const grabOffsetRef = useRef({ x: 0, y: 0 });

  const onMouseDown = (mouseEvent: MouseEvent): void => {
    const container = containerRef.current;
    if (container) {
      const containerRect = container.getBoundingClientRect();
      grabOffsetRef.current = {
        x: mouseEvent.clientX - containerRect.left,
        y: mouseEvent.clientY - containerRect.top,
      };

      dragStoreAction.drag({ draggedId: fileSystemObject.id });
    }

    onMouseDownCallback(mouseEvent);
  };

  const renderIconImageMask = (): JSX.Element => {
    return (
      <div
        {...stylex.props(styles.iconImageMask)}
        style={{
          maskImage: `url(${fileSystemObject.iconSrc})`,
          WebkitMaskImage: `url(${fileSystemObject.iconSrc})`,
        }}
      />
    );
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
        {isHighlighted && renderIconImageMask()}
      </div>
      <div
        {...stylex.props(
          styles.label,
          isHighlighted && styles.labelHighlighted,
          isLastHighlighted && styles.labelLastHighlighted,
        )}
      >
        {fileSystemObject.label}
      </div>
    </div>
  );
};
