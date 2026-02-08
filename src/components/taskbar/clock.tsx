import { color } from '@stylex/color.stylex.ts';
import { px } from '@stylex/px.stylex.ts';
import * as stylex from '@stylexjs/stylex';
import { type JSX, useEffect, useState } from 'react';

const styles = stylex.create({
  clock: {
    height: px[22],
    aspectRatio: '63/22',
    paddingTop: px[2],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: px[1],
    borderStyle: 'solid',
    borderColor: color.white,
    borderTopColor: color.gray,
    borderLeftColor: color.gray,
    fontSize: px[10],
  },
});

export const Clock = (): JSX.Element => {
  const [time, setTime] = useState<string>('00:00');

  useEffect(() => {
    const getTime = (): string => {
      return new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
    };

    const intervalId = setInterval(() => {
      setTime(getTime());
    }, 60000);

    setTime(getTime());

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return <div {...stylex.props(styles.clock)}>{time}</div>;
};
