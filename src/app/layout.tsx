'use client';

import { useDragStoreAction } from '@stores';
import '@styles';

import { color } from '@stylex/color.stylex.ts';
import { cursor } from '@stylex/cursor.stylex.ts';
import { font } from '@stylex/font.stylex.ts';
import * as stylex from '@stylexjs/stylex';
import type { JSX, PropsWithChildren } from 'react';

type Props = PropsWithChildren;

const styles = stylex.create({
  html: {
    height: '100%',
    fontFamily: font['Microsoft Sans Serif'],
    backgroundColor: color.black,
    cursor: cursor.none,
  },
  body: {
    height: 'inherit',
    display: 'flex',
    justifyContent: 'center',
  },
});

export default ({ children }: Props): JSX.Element => {
  const dragStoreAction = useDragStoreAction();

  return (
    <html lang='en' {...stylex.props(styles.html)}>
      <body
        onMouseUp={() => {
          dragStoreAction.drop();
        }}
        {...stylex.props(styles.body)}
      >
        {children}
      </body>
    </html>
  );
};
