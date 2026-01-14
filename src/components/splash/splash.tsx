import { useWindowSize } from '@hooks';
import Image from 'next/image';
import { type JSX, useEffect, useState } from 'react';

export const Splash = (): JSX.Element => {
  const { width, height } = useWindowSize();
  const [objectFit, setObjectFit] = useState<'cover' | 'contain'>('cover');

  useEffect(() => {
    if (!width || !height) {
      return;
    }

    if (width / height >= 1.333) {
      setObjectFit('contain');
    } else {
      setObjectFit('cover');
    }
  }, [width, height]);

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
