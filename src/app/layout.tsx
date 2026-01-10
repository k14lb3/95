import type { PropsWithChildren } from 'react';
import '@/styles/index.css';

export default ({ children }: PropsWithChildren) => {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
};
