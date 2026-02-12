import { useDesktopRect, useMousePosition } from '@hooks';
import { pxToVh, viewportToDesignPx } from '@lib';
import {
  useDragStoreAction,
  useDragStoreState,
  useFileSystemObjectStoreAction,
} from '@stores';
import { color } from '@stylex/color.stylex.ts';
import { px } from '@stylex/px.stylex.ts';
import * as stylex from '@stylexjs/stylex';
import type {
  FileSystemObject as FileSystemObjectType,
  Position,
} from '@types';
import Image from 'next/image';
import { type JSX, type MouseEvent, useEffect, useRef } from 'react';
import { useTaskbarRect } from '../../hooks/use-taskbar-rect';

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
  const fileSystemObjectStore = useFileSystemObjectStoreAction();
  const dragStoreAction = useDragStoreAction();
  const dragStoreState = useDragStoreState();

  const desktopRect = useDesktopRect();
  const taskbarRect = useTaskbarRect();
  const mousePosition = useMousePosition();
  const selfRef = useRef<HTMLDivElement>(null);
  const grabOffsetRef = useRef({ x: 0, y: 0 });

  const onMouseDown = (mouseEvent: MouseEvent): void => {
    const self = selfRef.current;
    if (self) {
      const selfRect = self.getBoundingClientRect();
      grabOffsetRef.current = {
        x: mouseEvent.clientX - selfRect.left,
        y: mouseEvent.clientY - selfRect.top,
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

    fileSystemObjectStore.move({
      fileSystemObjectId: fileSystemObject.id,
      position: {
        x: viewportToDesignPx({
          px: mousePosition.x - grabOffsetRef.current.x,
        }),
        y: viewportToDesignPx({
          px: mousePosition.y - grabOffsetRef.current.y,
        }),
      },
    });
  }, [
    mousePosition.x,
    mousePosition.y,
    dragStoreState.draggedId,
    fileSystemObject.id,
    fileSystemObjectStore,
  ]);

  useEffect(() => {
    const self = selfRef.current;
    if (!self) {
      return;
    }

    if (!desktopRect || !taskbarRect) {
      return;
    }

    const selfRect = self.getBoundingClientRect();
    const position: Partial<Position> = {};

    if (fileSystemObject.position.x <= 0) {
      position.x = 0;
    } else if (selfRect.right >= desktopRect.right) {
      position.x = viewportToDesignPx({
        px: desktopRect.right - selfRect.width - desktopRect.left,
      });
    }

    if (fileSystemObject.position.y <= 0) {
      position.y = 0;
    } else if (selfRect.bottom >= desktopRect.height - taskbarRect.height) {
      position.y = viewportToDesignPx({
        px: taskbarRect.top - selfRect.height,
      });
    }

    if (position.x !== undefined || position.y !== undefined) {
      fileSystemObjectStore.move({
        fileSystemObjectId: fileSystemObject.id,
        position,
      });
    }
  }, [
    fileSystemObject.id,
    fileSystemObject.position.x,
    fileSystemObject.position.y,
    fileSystemObjectStore.move,
    desktopRect,
    desktopRect?.width,
    desktopRect?.height,
    taskbarRect,
    taskbarRect?.height,
  ]);

  return (
    <div
      {...stylex.props(styles.fileSystemObject)}
      ref={selfRef}
      style={{
        zIndex:
          dragStoreState.draggedId === fileSystemObject.id ? 99 : undefined,
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
