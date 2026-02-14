import { Dos } from '@components';
import { type JSX } from 'react';

export const DosPrompt = (): JSX.Element => {
  return (
    <Dos>
      <Dos.Text>
        [Press any key to boot]
        <Dos.Cursor />
      </Dos.Text>
    </Dos>
  );
};
