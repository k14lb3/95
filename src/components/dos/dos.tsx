import { color } from '@stylex/color.stylex.ts';
import { px } from '@stylex/px.stylex.ts';
import * as stylex from '@stylexjs/stylex';
import type { JSX, PropsWithChildren } from 'react';

const styles = stylex.create({
  dos: {
    height: 'inherit',
    backgroundColor: color.black,
    color: color.white,
    padding: px[8],
    fontSize: px[16],
  },
});

type Props = PropsWithChildren;

export const Dos = ({ children }: Props): JSX.Element => {
  return <div {...stylex.props(styles.dos)}>{children}</div>;
};
