'use client';

import '@styles';

import { LocalStorageSyncer } from '@components';
import { DEFAULTS } from '@constants';
import { localStorageRepo } from '@lib';
import {
  useDragStoreAction,
  useFileSystemObjectStoreAction,
  useFileSystemObjectStoreState,
} from '@stores';
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
  const fileSystemObjectStoreState = useFileSystemObjectStoreState();
  const fileSystemObjectStoreAction = useFileSystemObjectStoreAction();
  const dragStoreAction = useDragStoreAction();

  return (
    <html
      lang='en'
      {...stylex.props(styles.html)}
      onMouseUp={() => {
        dragStoreAction.drop();
      }}
    >
      <LocalStorageSyncer
        value={fileSystemObjectStoreState.fileSystemObjects}
        defaultValue={DEFAULTS.FILE_SYSTEM_OBJECTS}
        setter={({ value }) => {
          fileSystemObjectStoreAction.set({ fileSystemObjects: value });
        }}
        repo={localStorageRepo.fileSystemObjects}
      />
      {children}
    </html>
  );
};
