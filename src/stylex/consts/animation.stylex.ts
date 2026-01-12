import * as stylex from '@stylexjs/stylex';

const blink = stylex.keyframes({
  '0%': {
    opacity: 1,
  },
  '50%': {
    opacity: 0,
  },
  '100%': {
    opacity: 1,
  },
});

export const animation = stylex.defineVars({
  blink,
});
