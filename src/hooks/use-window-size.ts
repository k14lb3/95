import { useEffect, useState } from 'react';

export type WindowSize = {
  width: number;
  height: number;
};

export const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: globalThis.innerWidth,
    height: globalThis.innerHeight,
  });

  useEffect(() => {
    const handler = () => {
      setWindowSize({
        width: globalThis.innerWidth,
        height: globalThis.innerHeight,
      });
    };

    handler();

    globalThis.addEventListener('resize', handler);

    return () => {
      globalThis.removeEventListener('resize', handler);
    };
  }, []);

  return windowSize;
};
