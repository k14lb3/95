import { useWindowSize } from '@hooks';
import Image from 'next/image';
import { type JSX, useEffect, useState } from 'react';

export const Splash = (): JSX.Element => {
  const windowSize = useWindowSize();
  const [objectFit, setObjectFit] = useState<'cover' | 'contain'>('cover');

  useEffect(() => {
    if (windowSize.width / windowSize.height >= 1.333) {
      setObjectFit('contain');
    } else {
      setObjectFit('cover');
    }
  }, [windowSize.width, windowSize.height]);

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
