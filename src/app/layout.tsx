import '@styles';

import { color } from '@stylex/color.stylex.ts';
import { font } from '@stylex/font.stylex.ts';
import * as stylex from '@stylexjs/stylex';
import type { JSX, PropsWithChildren } from 'react';

type Props = PropsWithChildren;

const styles = stylex.create({
  html: {
    height: '100%',
    fontFamily: font['Microsoft Sans Serif'],
    backgroundColor: color.black,
  },
  body: {
    height: 'inherit',
    display: 'flex',
    justifyContent: 'center',
  },
});

export default ({ children }: Props): JSX.Element => {
  return (
    <html lang='en' {...stylex.props(styles.html)}>
      <body {...stylex.props(styles.body)}>{children}</body>
    </html>
  );
};
