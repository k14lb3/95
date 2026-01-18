import { Taskbar } from '@components';
import { getRandomNumber, sessionStorage } from '@lib';
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

export const Desktop = (): JSX.Element => {
  const [shouldShowUI, setShouldShowUI] = useState<boolean>(false);

  useEffect(() => {
    const timeoutId = setTimeout(
      () => {
        setShouldShowUI(true);
      },
      getRandomNumber({ min: 500, max: 1500 }),
    );

    const isBooted = sessionStorage.get({ key: 'is-booted' });

    if (isBooted) {
      setShouldShowUI(true);
      clearTimeout(timeoutId);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div {...stylex.props(styles.desktop)}>
      {shouldShowUI && <Taskbar style={styles.taskbar} />}
    </div>
  );
};
