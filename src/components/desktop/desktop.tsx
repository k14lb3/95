import { Taskbar } from '@components';
import { DESKTOP_ID } from '@constants';
import {
  getFileSystemObjectsByParentId,
  getRandomNumber,
  sessionStorageRepo,
} from '@lib';
import {
  useCursorStyleStoreAction,
  useDragStoreAction,
  useFileSystemObjectStoreState,
  useFocusedStoreAction,
} from '@stores';
import { color } from '@stylex/color.stylex.ts';
import { cursor } from '@stylex/cursor.stylex.ts';
import * as stylex from '@stylexjs/stylex';
import { type JSX, useEffect, useState } from 'react';
import { FileSystemObjects } from '../file-system-objects';

const styles = stylex.create({
  desktop: {
    position: 'relative',
    height: 'inherit',
    backgroundColor: color.teal,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cursorDefault: {
    cursor: cursor.default,
  },
});

export const Desktop = (): JSX.Element => {
  const fileSystemObjectStoreState = useFileSystemObjectStoreState();
  const focusedStoreAction = useFocusedStoreAction();
  const dragStoreAction = useDragStoreAction();
  const cursorStyleStoreAction = useCursorStyleStoreAction();

  const [shouldShowUI, setShouldShowUI] = useState<boolean>(false);
  const [highlightedFileSystemObjectId, setHighlightedFileSystemObjectId] =
    useState<string | null>(null);
  const [
    lastHighlightedFileSystemObjectId,
    setLastHighlightedFileSystemObjectId,
  ] = useState<string | null>(null);

  const fileSystemObjects = getFileSystemObjectsByParentId({
    fileSystemObjects: fileSystemObjectStoreState.fileSystemObjects,
    parentId: 'desktop',
  });

  const handleMouseDown = (): void => {
    focusedStoreAction.focus({ focusedId: 'desktop' });

    if (highlightedFileSystemObjectId) {
      setHighlightedFileSystemObjectId(null);
      setLastHighlightedFileSystemObjectId(highlightedFileSystemObjectId);
    }
  };

  const handleMouseUp = (): void => {
    dragStoreAction.drop();
  };

  useEffect(() => {
    const timeoutId = setTimeout(
      () => {
        setShouldShowUI(true);
      },
      getRandomNumber({ min: 500, max: 1500 }),
    );

    const isBooted = sessionStorageRepo.isBooted.get();

    if (isBooted) {
      setShouldShowUI(true);
      clearTimeout(timeoutId);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    sessionStorageRepo.isBooted.set(true);
    cursorStyleStoreAction.set({ cursorStyle: styles.cursorDefault });
  }, [cursorStyleStoreAction.set]);

  return (
    <div
      {...stylex.props(styles.desktop)}
      id={DESKTOP_ID}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {shouldShowUI && (
        <>
          <FileSystemObjects
            fileSystemObjects={fileSystemObjects}
            highlightedFileSystemObjectId={highlightedFileSystemObjectId}
            setHighlightedFileSystemObjectId={setHighlightedFileSystemObjectId}
            lastHighlightedFileSystemObjectId={
              lastHighlightedFileSystemObjectId
            }
            setLastHighlightedFileSystemObjectId={
              setLastHighlightedFileSystemObjectId
            }
          />
          <Taskbar />
        </>
      )}
    </div>
  );
};
