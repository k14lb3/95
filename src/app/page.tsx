'use client';

import { Desktop, Dos, Screen, Splash } from '@components';
import { getRandomNumber, sessionStorage, sleep } from '@lib';
import type { BootStage } from '@types';
import { type JSX, useEffect, useState } from 'react';

export default (): JSX.Element => {
  const [bootStage, setBootStage] = useState<BootStage>('dos-loading');

  useEffect(() => {
    const timeoutId = setTimeout(
      () => {
        setBootStage('dos-prompt');
      },
      getRandomNumber({ min: 0, max: 500 }),
    );

    const isBooted = sessionStorage.get({ key: 'is-booted' });

    if (isBooted) {
      setBootStage('booted');
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
      await sleep({ ms: getRandomNumber({ min: 1000, max: 2000 }) });

      setBootStage('booted');
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
    <Screen>
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
                  sessionStorage.set({ key: 'is-booted', value: true });
                }}
              />
            );
        }
      })()}
    </Screen>
  );
};
