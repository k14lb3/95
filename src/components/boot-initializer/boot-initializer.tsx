'use client';

import { getRandomNumber, sessionStorageRepo } from '@lib';
import { useBootStageStoreAction, useCursorStyleStoreAction } from '@stores';
import { cursor } from '@stylex/cursor.stylex.ts';
import * as stylex from '@stylexjs/stylex';
import { useEffect } from 'react';

const styles = stylex.create({
  cursorDefault: {
    cursor: cursor.default,
  },
});

export const BootInitializer = (): null => {
  const bootStageStoreAction = useBootStageStoreAction();
  const cursorStyleStoreAction = useCursorStyleStoreAction();

  useEffect(() => {
    const timeoutId = setTimeout(
      () => {
        bootStageStoreAction.set({ bootStage: 'dos-prompt' });
      },
      getRandomNumber({ min: 0, max: 500 }),
    );

    const isBooted = sessionStorageRepo.isBooted.get();

    if (isBooted) {
      bootStageStoreAction.set({ bootStage: 'booted' });
      cursorStyleStoreAction.set({ cursorStyle: styles.cursorDefault });
      clearTimeout(timeoutId);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [bootStageStoreAction, cursorStyleStoreAction]);

  return null;
};
