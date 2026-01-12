import { font } from '@stylex/font.stylex.ts';
import * as stylex from '@stylexjs/stylex';
import type { JSX, PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  style?: stylex.StyleXStyles;
}>;

const styles = stylex.create({
  text: {
    display: 'block',
    width: 'max-content',
    fontFamily: font['IBM VGA 8x16'],
    transform: 'scaleX(0.8333)',
    transformOrigin: 'left',
  },
});

export const Text = ({ children, style }: Props): JSX.Element => {
  return <div {...stylex.props(styles.text, style)}>{children}</div>;
};
