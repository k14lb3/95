import { DESKTOP_ID } from '@constants';
import { useWindowSizeStoreState } from '@stores';
import { useEffect, useState } from 'react';

export const useDesktopRect = (): DOMRect | undefined => {
  const windowSizeStoreState = useWindowSizeStoreState();
  const [desktopRect, setDesktopRect] = useState<DOMRect>();

  // biome-ignore lint/correctness/useExhaustiveDependencies: Desktop size can change whenever window size changes.
  useEffect(() => {
    const desktop = document.getElementById(DESKTOP_ID);
    setDesktopRect(desktop?.getBoundingClientRect());
  }, [windowSizeStoreState.width, windowSizeStoreState.height]);

  return desktopRect;
};
