import { color } from '@stylex/color.stylex.ts';
import { px } from '@stylex/px.stylex.ts';
import * as stylex from '@stylexjs/stylex';
import type { JSX } from 'react';
import { Nest } from '../nest';
import { Clock } from './clock';
import { Start } from './start';

const styles = stylex.create({
  taskbar: {
    height: px[28],
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

type Props = {
  style?: stylex.StyleXStyles;
};

export const Taskbar = ({ style }: Props): JSX.Element => {
  return (
    <Nest
      tag='div'
      count={3}
      styles={[
        [styles.taskbar, style],
        [styles.taskbarInner1],
        [styles.taskbarInner2],
      ]}
    >
      <Start />
      <Clock />
    </Nest>
  );
};
