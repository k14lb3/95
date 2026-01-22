import { Taskbar } from '@components';
import { getRandomNumber, sessionStorageRepo } from '@lib';
import { color } from '@stylex/color.stylex.ts';
import * as stylex from '@stylexjs/stylex';
import { type JSX, useEffect, useState } from 'react';

const styles = stylex.create({
  desktop: {
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

  useEffect(() => {
    if (!shouldShowUI) {
      return;
    }

    onShowUI();
  }, [shouldShowUI, onShowUI]);

  return (
    <div {...stylex.props(styles.desktop)}>
      {shouldShowUI && <Taskbar style={styles.taskbar} />}
    </div>
  );
};
