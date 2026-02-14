'use client';

import {
  Desktop,
  DosLoading,
  DosPrompt,
  DosStarting,
  Splash,
} from '@components';
import { useEventListener } from '@hooks';
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
import { type JSX, useEffect, useEffectEvent, useState } from 'react';

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

  const startBootSequence = useEffectEvent(async () => {
    if (bootStageStoreState.bootStage !== 'dos-prompt') {
      return;
    }

    bootStageStoreAction.set({ bootStage: 'dos-loading' });
    await sleep({ ms: getRandomNumber({ min: 500, max: 2000 }) });

    bootStageStoreAction.set({ bootStage: 'dos-starting' });
    await sleep({ ms: getRandomNumber({ min: 500, max: 1000 }) });

    bootStageStoreAction.set({ bootStage: 'dos-loading' });
    await sleep({ ms: getRandomNumber({ min: 500, max: 2000 }) });

    bootStageStoreAction.set({ bootStage: 'splash' });
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
  });

  useEffect(() => {
    setShouldSetBodyAspectRatio(
      windowSizeStore.width / windowSizeStore.height >= 1.333,
    );
  }, [windowSizeStore.width, windowSizeStore.height]);

  useEventListener({
    eventName: 'keydown',
    handler: startBootSequence,
  });

  useEventListener({
    eventName: 'keydown',
    handler: startBootSequence,
    options: {
      passive: true,
    },
  });

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
          case 'dos-loading':
            return <DosLoading />;
          case 'dos-prompt':
            return <DosPrompt />;
          case 'dos-starting':
            return <DosStarting />;
          case 'splash':
            return <Splash />;
          case 'initializing':
            return null;
          case 'booted':
            return <Desktop />;
        }
      })()}
    </body>
  );
};
