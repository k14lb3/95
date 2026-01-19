import { color } from '@stylex/color.stylex.ts';
import { px } from '@stylex/px.stylex.ts';
import * as stylex from '@stylexjs/stylex';
import Image from 'next/image';
import type { JSX } from 'react';
import { Nest } from '../nest';

const styles = stylex.create({
  start: {
    aspectRatio: '27/11',
    height: px[22],
    borderWidth: px[1],
    borderStyle: 'solid',
    borderColor: color.black,
    borderTopColor: color.white,
    borderLeftColor: color.white,
  },
  startInner1: {
    height: '100%',
    borderWidth: px[1],
    borderStyle: 'solid',
    borderColor: color.gray,
    borderTopColor: color.alto,
    borderLeftColor: color.alto,
  },
  startInner2: {
    height: 'inherit',
    display: 'flex',
    alignItems: 'center',
    padding: px[2],
    backgroundColor: color.silver,
  },
  icon: {
    position: 'relative',
    height: px[14],
    aspectRatio: '8/7',
  },
  label: {
    marginLeft: px[3],
    paddingBottom: px[4],
    fontSize: px[12],
    fontWeight: 'bold',
  },
});

export const Start = (): JSX.Element => {
  return (
    <Nest
      tag='div'
      count={3}
      styles={[[styles.start], [styles.startInner1], [styles.startInner2]]}
    >
      <div {...stylex.props(styles.icon)}>
        <Image
          src='/images/icons/95.png'
          fill={true}
          objectFit='contain'
          unoptimized={true}
          alt='start'
        />
      </div>
      <div {...stylex.props(styles.label)}>Start</div>
    </Nest>
  );
};
