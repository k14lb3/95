import { Taskbar } from '@components';
import { getRandomNumber, sessionStorageRepo } from '@lib';
import { color } from '@stylex/color.stylex.ts';
import * as stylex from '@stylexjs/stylex';
import { type JSX, useEffect, useEffectEvent, useState } from 'react';
import { FileSystemObjects } from './file-system-objects';

const styles = stylex.create({
  desktop: {
    position: 'relative',
    height: 'inherit',
    backgroundColor: color.teal,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  taskbar: {
    marginTop: 'auto',
  },
});

type Props = {
  onShowUI: () => void;
};

export const Desktop = ({ onShowUI }: Props): JSX.Element => {
  const [shouldShowUI, setShouldShowUI] = useState<boolean>(false);

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
    <div {...stylex.props(styles.desktop)}>
      {shouldShowUI && (
        <>
          <FileSystemObjects />
          <Taskbar style={styles.taskbar} />
        </>
      )}
    </div>
  );
};
