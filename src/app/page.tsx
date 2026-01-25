'use client';

import { Desktop, Dos, Screen, Splash } from '@components';
import { getRandomNumber, sessionStorageRepo, sleep } from '@lib';
import { cursor } from '@stylex/cursor.stylex.ts';
import * as stylex from '@stylexjs/stylex';
import type { BootStage } from '@types';
import { type JSX, useEffect, useState } from 'react';

const styles = stylex.create({
  cursorNone: {
    cursor: cursor.none,
  },
  cursorDefault: {
    cursor: cursor.default,
  },
  cursorProgress: {
    cursor: cursor.progress,
  },
  cursorWait: {
    cursor: cursor.wait,
  },
});

export default (): JSX.Element => {
  const [cursorStyle, setCursorStyle] = useState<
    | typeof styles.cursorNone
    | typeof styles.cursorDefault
    | typeof styles.cursorProgress
    | typeof styles.cursorWait
  >(styles.cursorNone);
  const [bootStage, setBootStage] = useState<BootStage>('dos-loading');

  useEffect(() => {
    const timeoutId = setTimeout(
      () => {
        setBootStage('dos-prompt');
      },
      getRandomNumber({ min: 0, max: 500 }),
    );

    const isBooted = sessionStorageRepo.isBooted.get();

    if (isBooted) {
      setBootStage('booted');
      setCursorStyle(styles.cursorDefault);
      clearTimeout(timeoutId);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const handler = async () => {
      if (bootStage !== 'dos-prompt') {
        return;
      }

      setBootStage('dos-loading');
      await sleep({ ms: getRandomNumber({ min: 500, max: 2000 }) });

      setBootStage('dos-starting');
      await sleep({ ms: getRandomNumber({ min: 500, max: 1000 }) });

      setBootStage('dos-loading');
      await sleep({ ms: getRandomNumber({ min: 500, max: 2000 }) });

      setBootStage('splash');
      await sleep({ ms: 7000 });

      setBootStage('initializing');
      setCursorStyle(styles.cursorDefault);
      await sleep({ ms: getRandomNumber({ min: 200, max: 500 }) });

      setCursorStyle(styles.cursorProgress);
      await sleep({ ms: getRandomNumber({ min: 200, max: 500 }) });

      setCursorStyle(styles.cursorDefault);
      await sleep({ ms: getRandomNumber({ min: 200, max: 500 }) });

      setCursorStyle(styles.cursorWait);
      await sleep({ ms: getRandomNumber({ min: 200, max: 500 }) });

      setCursorStyle(styles.cursorDefault);
      setBootStage('booted');
      setCursorStyle(styles.cursorWait);
    };

    const touchStartEventListenerOptions: AddEventListenerOptions = {
      passive: true,
    };

    window.addEventListener('keydown', handler);
    window.addEventListener(
      'touchstart',
      handler,
      touchStartEventListenerOptions,
    );

    return () => {
      window.removeEventListener('keydown', handler);
      window.removeEventListener(
        'touchstart',
        handler,
        touchStartEventListenerOptions,
      );
    };
  }, [bootStage]);

  return (
    <Screen style={cursorStyle}>
      {(() => {
        switch (bootStage) {
          case 'dos-loading':
            return (
              <Dos>
                <Dos.Text>
                  <Dos.Cursor />
                </Dos.Text>
              </Dos>
            );
          case 'dos-prompt':
            return (
              <Dos>
                <Dos.Text>
                  [Press any key to boot]
                  <Dos.Cursor />
                </Dos.Text>
              </Dos>
            );
          case 'dos-starting':
            return (
              <Dos>
                <Dos.Text>Starting 95...</Dos.Text>
                <Dos.Text>&nbsp;</Dos.Text>
                <Dos.Text>&nbsp;</Dos.Text>
                <Dos.Text>
                  <Dos.Cursor />
                </Dos.Text>
              </Dos>
            );
          case 'splash':
            return (
              <>
                <audio src='/audio/splash.mp3' autoPlay={true}>
                  <track kind='captions' />
                </audio>
                <Splash />
              </>
            );
          case 'initializing':
            return;
          case 'booted':
            return (
              <Desktop
                onShowUI={() => {
                  sessionStorageRepo.isBooted.set(true);
                  setCursorStyle(styles.cursorDefault);
                }}
              />
            );
        }
      })()}
    </Screen>
  );
};
