import { SCREEN_ELEMENT_ID } from '@constants';
import { useWindowSize } from '@hooks';
import * as stylex from '@stylexjs/stylex';
import { type JSX, type PropsWithChildren, useEffect, useState } from 'react';

const styles = stylex.create({
  screen: {
    width: '100%',
    height: 'inherit',
  },
  screenAspectRatio: {
    width: null,
    aspectRatio: '4/3',
  },
});

type Props = PropsWithChildren<{
  style?: stylex.StyleXStyles;
}>;

export const Screen = ({ style, children }: Props): JSX.Element => {
  const windowSize = useWindowSize();
  const [shouldSetScreenAspectRatio, setShouldSetScreenAspectRatio] =
    useState<boolean>(false);

  useEffect(() => {
    if (windowSize.width / windowSize.height >= 1.333) {
      setShouldSetScreenAspectRatio(true);
    } else {
      setShouldSetScreenAspectRatio(false);
    }
  }, [windowSize.width, windowSize.height]);

  return (
    <div
      id={SCREEN_ELEMENT_ID}
      {...stylex.props(
        styles.screen,
        shouldSetScreenAspectRatio && styles.screenAspectRatio,
        style,
      )}
    >
      {children}
    </div>
  );
};
