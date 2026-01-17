import { useWindowSize } from '@hooks';
import * as stylex from '@stylexjs/stylex';
import { type JSX, type PropsWithChildren, useEffect, useState } from 'react';

const styles = stylex.create({
  screen: {
    width: '100%',
    height: 'inherit',
  },
  screenAspectRatio: {
    width: 'unset',
    aspectRatio: '4/3',
  },
});

type Props = PropsWithChildren;

export const Screen = ({ children }: Props): JSX.Element => {
  const { width, height } = useWindowSize();
  const [shouldSetScreenAspectRatio, setShouldSetScreenAspectRatio] =
    useState<boolean>(false);

  useEffect(() => {
    if (!width || !height) {
      return;
    }

    if (width / height >= 1.333) {
      setShouldSetScreenAspectRatio(true);
    } else {
      setShouldSetScreenAspectRatio(false);
    }
  }, [width, height]);

  return (
    <div
      {...stylex.props(
        styles.screen,
        shouldSetScreenAspectRatio && styles.screenAspectRatio,
      )}
    >
      {children}
    </div>
  );
};
