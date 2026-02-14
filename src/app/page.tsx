'use client';

import { Desktop, Dos, Splash } from '@components';
import { getRandomNumber, sleep } from '@lib';
import {
  useBootStageStoreAction,
  useBootStageStoreState,
  useCursorStyleStoreAction,
  useCursorStyleStoreState,
  useWindowSizeStoreState,
} from '@stores';
import { cursor } from '@stylex/cursor.stylex.ts';
import * as stylex from '@stylexjs/stylex';
import { type JSX, useEffect, useState } from 'react';

const styles = stylex.create({
  body: {
    width: '100%',
    height: 'inherit',
  },
  bodyAspectRatio: {
    width: null,
    aspectRatio: '4/3',
  },
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
  const windowSizeStore = useWindowSizeStoreState();
  const bootStageStoreState = useBootStageStoreState();
  const bootStageStoreAction = useBootStageStoreAction();
  const cursorStyleStoreState = useCursorStyleStoreState();
  const cursorStyleStoreAction = useCursorStyleStoreAction();

  const [shouldSetBodyAspectRatio, setShouldSetBodyAspectRatio] =
    useState<boolean>(false);

  useEffect(() => {
    setShouldSetBodyAspectRatio(
      windowSizeStore.width / windowSizeStore.height >= 1.333,
    );
  }, [windowSizeStore.width, windowSizeStore.height]);

  useEffect(() => {
    (async () => {
      if (bootStageStoreState.bootStage !== 'splash') {
        return;
      }

      const audio = new Audio('/audio/splash.mp3');
      audio.play();
      await sleep({ ms: 7000 });

      bootStageStoreAction.set({ bootStage: 'initializing' });
      cursorStyleStoreAction.set({ cursorStyle: styles.cursorDefault });
      await sleep({ ms: getRandomNumber({ min: 200, max: 500 }) });

      cursorStyleStoreAction.set({ cursorStyle: styles.cursorProgress });
      await sleep({ ms: getRandomNumber({ min: 200, max: 500 }) });

      cursorStyleStoreAction.set({ cursorStyle: styles.cursorDefault });
      await sleep({ ms: getRandomNumber({ min: 200, max: 500 }) });

      cursorStyleStoreAction.set({ cursorStyle: styles.cursorWait });
      await sleep({ ms: getRandomNumber({ min: 200, max: 500 }) });

      cursorStyleStoreAction.set({ cursorStyle: styles.cursorDefault });
      bootStageStoreAction.set({ bootStage: 'booted' });
      cursorStyleStoreAction.set({ cursorStyle: styles.cursorWait });
    })();
  }, [
    bootStageStoreAction.set,
    cursorStyleStoreAction.set,
    bootStageStoreState.bootStage,
  ]);

  return (
    <body
      {...stylex.props(
        styles.body,
        shouldSetBodyAspectRatio && styles.bodyAspectRatio,
        cursorStyleStoreState.cursorStyle,
      )}
    >
      {(() => {
        switch (bootStageStoreState.bootStage) {
          case 'dos-prompt':
          case 'dos-loading':
          case 'dos-starting':
            return <Dos />;
          case 'splash':
            return <Splash />;
          case 'initializing':
            return null;
          case 'booted':
            return <Desktop />;
          default:
            return null;
        }
      })()}
    </body>
  );
};
