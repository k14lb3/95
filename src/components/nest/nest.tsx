import * as stylex from '@stylexjs/stylex';
import type { JSX, PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  tag: keyof JSX.IntrinsicElements;
  count?: number;
  styles?: stylex.StyleXStyles[];
}>;

export const Nest = ({
  tag: Tag,
  count = 1,
  styles = [],
  children,
}: Props): JSX.Element => {
  if (count < 1) {
    throw new Error('`count` prop should be greater than 1.');
  }

  const style = styles[0];

  if (count === 1) {
    return <Tag {...stylex.props(style && style)}>{children}</Tag>;
  }

  return (
    <Tag {...stylex.props(style && style)}>
      {count !== 1 ? (
        <Nest tag={Tag} count={count - 1} styles={styles.slice(1)}>
          {children}
        </Nest>
      ) : (
        children
      )}
    </Tag>
  );
};
