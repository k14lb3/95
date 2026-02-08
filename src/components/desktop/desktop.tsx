import { Taskbar } from '@components';
import {
  getFileSystemObjectsByParentId,
  getRandomNumber,
  sessionStorageRepo,
} from '@lib';
import {
  useDragStoreAction,
  useFileSystemObjectStoreState,
  useFocusedStoreAction,
} from '@stores';
import { color } from '@stylex/color.stylex.ts';
import * as stylex from '@stylexjs/stylex';
import { type JSX, useEffect, useEffectEvent, useState } from 'react';
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
});

type Props = {
  onShowUI: () => void;
};

export const Desktop = ({ onShowUI }: Props): JSX.Element => {
  const fileSystemObjectStoreState = useFileSystemObjectStoreState();
  const focusedStoreAction = useFocusedStoreAction();
  const dragStoreAction = useDragStoreAction();

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

  const onMouseDown = (): void => {
    focusedStoreAction.focus({ focusedId: 'desktop' });

    if (highlightedFileSystemObjectId) {
      setHighlightedFileSystemObjectId(null);
      setLastHighlightedFileSystemObjectId(highlightedFileSystemObjectId);
    }
  };

  const onMouseUp = (): void => {
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

  const onShowUiEffectEvent = useEffectEvent(onShowUI);

  useEffect(() => {
    onShowUiEffectEvent();
  }, []);

  return (
    <div
      {...stylex.props(styles.desktop)}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
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
