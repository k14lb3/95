import { getRandomNumber } from '@lib';
import { color } from '@stylex/color.stylex.ts';
import { px } from '@stylex/px.stylex.ts';
import * as stylex from '@stylexjs/stylex';
import { type JSX, useEffect, useState } from 'react';
import { Cursor } from './cursor';
import { Text } from './text';

type BootStage = 'loading' | 'prompt' | 'starting';

const styles = stylex.create({
  dos: {
    height: 'inherit',
    backgroundColor: color.black,
    color: color.white,
    padding: px[8],
    fontSize: px[16],
  },
});

export const Dos = (): JSX.Element => {
  const [bootStage, setBootStage] = useState<BootStage>('loading');

  useEffect(() => {
    setTimeout(
      () => {
        setBootStage('prompt');
      },
      getRandomNumber({ min: 0, max: 500 }),
    );
  }, []);

  useEffect(() => {
    const handler = () => {
      if (bootStage !== 'prompt') {
        return;
      }

      setBootStage('loading');

      setTimeout(
        () => {
          setBootStage('starting');
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
    <div {...stylex.props(styles.dos)}>
      {(() => {
        switch (bootStage) {
          case 'loading':
            return (
              <Text>
                <Cursor />
              </Text>
            );
          case 'prompt':
            return (
              <Text>
                [Press any key to boot]
                <Cursor />
              </Text>
            );
          case 'starting':
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
            break;
        }
      })()}
    </div>
  );
};
