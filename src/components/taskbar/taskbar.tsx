import { TASKBAR_ID } from '@constants';
import { color } from '@stylex/color.stylex.ts';
import { px } from '@stylex/px.stylex.ts';
import * as stylex from '@stylexjs/stylex';
import type { JSX } from 'react';
import { NestedDiv } from '../nest';
import { Clock } from './clock';
import { Start } from './start';

const styles = stylex.create({
  taskbar: {
    height: px[28],
    marginTop: 'auto',
    backgroundColor: color.silver,
    borderTopWidth: px[1],
    borderTopStyle: 'solid',
    borderTopColor: color.alto,
  },
  taskbarInner1: {
    height: '100%',
    borderTopWidth: px[1],
    borderTopStyle: 'solid',
    borderTopColor: color.white,
  },
  taskbarInner2: {
    height: 'inherit',
    paddingHorizontal: px[2],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: color.silver,
  },
});

export const Taskbar = (): JSX.Element => {
  return (
    <NestedDiv
      id={TASKBAR_ID}
      count={3}
      styles={[
        [styles.taskbar],
        [styles.taskbarInner1],
        [styles.taskbarInner2],
      ]}
    >
      <Start />
      <Clock />
    </NestedDiv>
  );
};
