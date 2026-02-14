import { useWindowSizeStoreState } from '@stores';
import Image from 'next/image';
import { type JSX, useEffect, useState } from 'react';

export const Splash = (): JSX.Element => {
  const windowSizeStoreState = useWindowSizeStoreState();
  const [objectFit, setObjectFit] = useState<'cover' | 'contain'>('cover');

  useEffect(() => {
    if (windowSizeStoreState.width / windowSizeStoreState.height >= 1.333) {
      setObjectFit('contain');
    } else {
      setObjectFit('cover');
    }
  }, [windowSizeStoreState.width, windowSizeStoreState.height]);

  return (
    <Image
      src='/images/splash.jpg'
      alt='splash'
      fill={true}
      objectFit={objectFit}
      quality={100}
      unoptimized={true}
    />
  );
};
