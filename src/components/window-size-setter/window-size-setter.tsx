import { useWindowSizeStoreAction } from '@stores';
import { useEffect } from 'react';

export const WindowSizeSetter = (): null => {
  const windowSizeStoreAction = useWindowSizeStoreAction();

  useEffect(() => {
    const handler = () => {
      windowSizeStoreAction.set({
        width: globalThis.innerWidth,
        height: globalThis.innerHeight,
      });
    };

    handler();

    globalThis.addEventListener('resize', handler);

    return () => {
      globalThis.removeEventListener('resize', handler);
    };
  }, [windowSizeStoreAction.set]);

  return null;
};
