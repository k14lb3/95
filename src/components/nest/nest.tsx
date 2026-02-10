import * as stylex from '@stylexjs/stylex';
import type { ComponentProps, PropsWithChildren } from 'react';

type Props = PropsWithChildren<
  {
    count?: number;
    styles?: stylex.StyleXStyles[];
  } & ComponentProps<'div'>
>;

export const NestedDiv = ({
  count = 1,
  styles = [],
  children,
  ...rest
}: Props) => {
  if (count < 1) {
    throw new Error('`count` prop should be greater than 1.');
  }

  const style = styles[0];

  if (count === 1) {
    return (
      <div {...rest} {...stylex.props(style)}>
        {children}
      </div>
    );
  }

  return (
    <div {...rest} {...stylex.props(style)}>
      <NestedDiv {...rest} count={count - 1} styles={styles.slice(1)}>
        {children}
      </NestedDiv>
    </div>
  );
};
