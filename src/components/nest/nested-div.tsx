import * as stylex from '@stylexjs/stylex';
import type { MouseEvent, PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  id?: string;
  count?: number;
  styles?: stylex.StyleXStyles[];
  onMouseDown?: (mouseEvent: MouseEvent) => void;
}>;

export const NestedDiv = ({
  id,
  count = 1,
  styles = [],
  onMouseDown,
  children,
}: Props) => {
  if (count < 1) {
    throw new Error('`count` prop should be greater than 1.');
  }

  const style = styles[0];

  if (count === 1) {
    return (
      <div {...stylex.props(style)} id={id}>
        {children}
      </div>
    );
  }

  return (
    <div {...stylex.props(style)} id={id} onMouseDown={onMouseDown}>
      <NestedDiv count={count - 1} styles={styles.slice(1)}>
        {children}
      </NestedDiv>
    </div>
  );
};
