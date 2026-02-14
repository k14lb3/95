import { useEventListener } from '@hooks';
import { getRandomNumber, sleep } from '@lib';
import { useBootStageStoreAction, useBootStageStoreState } from '@stores';
import { color } from '@stylex/color.stylex.ts';
import { cursor } from '@stylex/cursor.stylex.ts';
import { px } from '@stylex/px.stylex.ts';
import * as stylex from '@stylexjs/stylex';
import { type JSX, useEffectEvent } from 'react';
import { Cursor } from './cursor';
import { Text } from './text';

const styles = stylex.create({
  dos: {
    height: 'inherit',
    backgroundColor: color.black,
    color: color.white,
    padding: px[8],
    fontSize: px[16],
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

export const Dos = (): JSX.Element => {
  const bootStageStoreState = useBootStageStoreState();
  const bootStageStoreAction = useBootStageStoreAction();

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
  });

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
    <div {...stylex.props(styles.dos)}>
      {(() => {
        switch (bootStageStoreState.bootStage) {
          case 'dos-prompt':
            return (
              <Text>
                [Press any key to boot]
                <Cursor />
              </Text>
            );
          case 'dos-loading':
            return (
              <Text>
                <Cursor />
              </Text>
            );
          case 'dos-starting':
            return (
              <>
                <Text>Starting 95...</Text>
                <Text>&nbsp;</Text>
                <Text>&nbsp;</Text>
                <Text>
                  <Cursor />
                </Text>
              </>
            );
          default:
            return null;
        }
      })()}
    </div>
  );
};
