import { DESKTOP_ID } from '@constants';
import { useEffect, useState } from 'react';
import { useWindowSize } from './use-window-size';

export const useDesktopRect = (): DOMRect | undefined => {
  const windowSize = useWindowSize();
  const [desktopRect, setDesktopRect] = useState<DOMRect>();

  // biome-ignore lint/correctness/useExhaustiveDependencies: Desktop size can change whenever window size changes.
  useEffect(() => {
    const desktop = document.getElementById(DESKTOP_ID);
    setDesktopRect(desktop?.getBoundingClientRect());
  }, [windowSize.width, windowSize.height]);

  return desktopRect;
};
