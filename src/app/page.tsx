'use client';

import { Desktop, Dos, Screen, Splash } from '@components';
import { getRandomNumber } from '@lib';
import type { BootStage } from '@types';
import { type JSX, useEffect, useState } from 'react';

export default (): JSX.Element => {
  const [bootStage, setBootStage] = useState<BootStage>('dos-loading');

  useEffect(() => {
    setTimeout(
      () => {
        setBootStage('dos-prompt');
      },
      getRandomNumber({ min: 0, max: 500 }),
    );
  }, []);

  useEffect(() => {
    const handler = () => {
      if (bootStage !== 'dos-prompt') {
        return;
      }

      setBootStage('dos-loading');

      setTimeout(
        () => {
          setBootStage('dos-starting');

          setTimeout(
            () => {
              setBootStage('dos-loading');

              setTimeout(
                () => {
                  setBootStage('splash');

                  setTimeout(() => {
                    setBootStage('initializing');

                    setTimeout(
                      () => {
                        setBootStage('booted');
                      },
                      getRandomNumber({ min: 1000, max: 2000 }),
                    );
                  }, 7000);
                },
                getRandomNumber({ min: 500, max: 1000 }),
              );
            },
            getRandomNumber({ min: 500, max: 1000 }),
          );
        },
        getRandomNumber({ min: 500, max: 2000 }),
      );
    };

    window.addEventListener('keydown', handler);

    return () => {
      window.removeEventListener('keydown', handler);
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
            return <Desktop />;
        }
      })()}
    </Screen>
  );
};
