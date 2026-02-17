import { DESKTOP_ID } from '@constants';
import { useDesktopRect, useMousePosition, useTaskbarRect } from '@hooks';
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
import { type JSX, type MouseEvent, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { DragGhost } from './drag-ghost';

export type BaseFileSystemObjectProps = {
  fileSystemObject: FileSystemObjectType;
  isHighlighted: boolean;
  isLastHighlighted: boolean;
  showIndicators?: boolean;
  onMouseDown?: (mouseEvent: MouseEvent) => void;
  onMouseUp?: (mouseEvent: MouseEvent) => void;
  onDoubleClick?: (mouseEvent: MouseEvent) => void;
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
  },
  label: {
    padding: px[1],
    marginTop: px[4],
    borderWidth: px[1],
    borderStyle: 'dotted',
    borderColor: color.transparent,
    color: color.white,
    fontSize: px[12],
    whiteSpace: 'nowrap',
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
  showIndicators = true,
  onMouseDown,
  onMouseUp,
  onDoubleClick,
}: BaseFileSystemObjectProps): JSX.Element => {
  const fileSystemObjectStoreAction = useFileSystemObjectStoreAction();
  const dragStoreAction = useDragStoreAction();
  const dragStoreState = useDragStoreState();

  const desktopRect = useDesktopRect();
  const taskbarRect = useTaskbarRect();
  const mousePosition = useMousePosition();

  const [dragGhostPosition, setDragGhostPosition] = useState<Position | null>(
    null,
  );
  const selfRef = useRef<HTMLDivElement>(null);
  const grabOffsetRef = useRef({ x: 0, y: 0 });

  const handleMouseDown = (mouseEvent: MouseEvent): void => {
    const self = selfRef.current;
    if (self) {
      const selfRect = self.getBoundingClientRect();
      grabOffsetRef.current = {
        x: mouseEvent.clientX - selfRect.left,
        y: mouseEvent.clientY - selfRect.top,
      };

      dragStoreAction.drag({ draggedId: fileSystemObject.id });
    }

    onMouseDown?.(mouseEvent);
  };

  const handleDragGhostMouseUp = (mouseEvent: MouseEvent): void => {
    fileSystemObjectStoreAction.move({
      fileSystemObjectId: fileSystemObject.id,
      position: dragGhostPosition ?? {},
    });

    setDragGhostPosition(null);

    onMouseUp?.(mouseEvent);
  };

  const handleDoubleClick = (mouseEvent: MouseEvent): void => {
    onDoubleClick?.(mouseEvent);
  };

  useEffect(() => {
    if (dragStoreState.draggedId !== fileSystemObject.id) {
      return;
    }

    setDragGhostPosition({
      x: viewportToDesignPx({
        px: mousePosition.x - grabOffsetRef.current.x,
      }),
      y: viewportToDesignPx({
        px: mousePosition.y - grabOffsetRef.current.y,
      }),
    });
  }, [
    mousePosition.x,
    mousePosition.y,
    dragStoreState.draggedId,
    fileSystemObject.id,
  ]);

  useEffect(() => {
    const self = selfRef.current;
    if (!self || !desktopRect || !taskbarRect) {
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
      fileSystemObjectStoreAction.move({
        fileSystemObjectId: fileSystemObject.id,
        position,
      });
    }
  }, [
    fileSystemObject.id,
    fileSystemObject.position.x,
    fileSystemObject.position.y,
    fileSystemObjectStoreAction.move,
    desktopRect,
    desktopRect?.width,
    desktopRect?.height,
    taskbarRect,
    taskbarRect?.height,
  ]);

  const desktopElement = document.getElementById(DESKTOP_ID);

  return (
    <div
      {...stylex.props(styles.fileSystemObject)}
      ref={selfRef}
      style={{
        left: pxToVh({ px: fileSystemObject.position.x }),
        top: pxToVh({ px: fileSystemObject.position.y }),
      }}
    >
      {dragGhostPosition &&
        desktopElement &&
        createPortal(
          <DragGhost
            style={{
              left: pxToVh({ px: dragGhostPosition.x }),
              top: pxToVh({ px: dragGhostPosition.y }),
            }}
            fileSystemObject={fileSystemObject}
            onMouseUp={handleDragGhostMouseUp}
          />,
          desktopElement,
        )}
      <div
        {...stylex.props(styles.icon)}
        onMouseDown={handleMouseDown}
        onDoubleClick={handleDoubleClick}
      >
        <Image
          src={fileSystemObject.iconSrc}
          alt={fileSystemObject.label}
          fill={true}
        />
        {showIndicators && isHighlighted && (
          <div
            {...stylex.props(styles.iconImageMask)}
            style={{
              maskImage: `url(${fileSystemObject.iconSrc})`,
              WebkitMaskImage: `url(${fileSystemObject.iconSrc})`,
            }}
          />
        )}
      </div>
      <div
        {...stylex.props(
          styles.label,
          showIndicators && isHighlighted && styles.labelHighlighted,
          showIndicators && isLastHighlighted && styles.labelLastHighlighted,
        )}
        onMouseDown={handleMouseDown}
      >
        {fileSystemObject.label}
      </div>
    </div>
  );
};
