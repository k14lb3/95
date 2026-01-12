import { animation } from '@stylex/animation.stylex.ts';
import * as stylex from '@stylexjs/stylex';
import type { JSX } from 'react';

const styles = stylex.create({
  cursor: {
    display: 'inline-block',
    animationName: animation.blink,
    animationDuration: '250ms',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'step-start',
  },
});

export const Cursor = (): JSX.Element => {
  return <div {...stylex.props(styles.cursor)}>_</div>;
};
