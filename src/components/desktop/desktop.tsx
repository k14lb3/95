import { color } from '@stylex/color.stylex.ts';
import * as stylex from '@stylexjs/stylex';
import type { JSX } from 'react';

const styles = stylex.create({
  desktop: {
    height: 'inherit',
    backgroundColor: color.teal,
  },
});

export const Desktop = (): JSX.Element => {
  return <div {...stylex.props(styles.desktop)} />;
};
