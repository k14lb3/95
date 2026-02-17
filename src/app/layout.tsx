'use client';

import '@styles';

import {
  BootInitializer,
  FileSystemObjectsLocalStorageSyncer,
  WindowSizeSetter,
} from '@components';
import { useEventListener } from '@hooks';
import { useDragStoreAction } from '@stores';
import { color } from '@stylex/color.stylex.ts';
import { cursor } from '@stylex/cursor.stylex.ts';
import { font } from '@stylex/font.stylex.ts';
import * as stylex from '@stylexjs/stylex';
import type { JSX, PropsWithChildren } from 'react';

type Props = PropsWithChildren;

const styles = stylex.create({
  html: {
    fontFamily: font['Microsoft Sans Serif'],
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: color.black,
    cursor: cursor.none,
  },
});

export default ({ children }: Props): JSX.Element => {
  const dragStoreAction = useDragStoreAction();

  useEventListener({
    eventName: 'mouseup',
    handler: () => {
      dragStoreAction.drop();
    },
  });

  return (
    <html lang='en' {...stylex.props(styles.html)}>
      <BootInitializer />
      <WindowSizeSetter />
      <FileSystemObjectsLocalStorageSyncer />
      {children}
    </html>
  );
};
