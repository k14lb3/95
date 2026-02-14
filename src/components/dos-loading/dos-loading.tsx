import { Dos } from '@components';
import { type JSX } from 'react';

export const DosLoading = (): JSX.Element => {
  return (
    <Dos>
      <Dos.Text>
        <Dos.Cursor />
      </Dos.Text>
    </Dos>
  );
};
