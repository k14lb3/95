import { Dos } from '@components';
import { type JSX } from 'react';

export const DosStarting = (): JSX.Element => {
  return (
    <Dos>
      <Dos.Text>Starting 95...</Dos.Text>
      <Dos.Text>&nbsp;</Dos.Text>
      <Dos.Text>&nbsp;</Dos.Text>
      <Dos.Text>
        <Dos.Cursor />
      </Dos.Text>
    </Dos>
  );
};
