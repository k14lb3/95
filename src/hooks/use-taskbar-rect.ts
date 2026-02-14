import { TASKBAR_ID } from '@constants';
import { useWindowSizeStoreState } from '@stores';
import { useEffect, useState } from 'react';

export const useTaskbarRect = (): DOMRect | undefined => {
  const windowSizeStoreState = useWindowSizeStoreState();
  const [taskbarRect, setTaskbarRect] = useState<DOMRect>();

  // biome-ignore lint/correctness/useExhaustiveDependencies: Desktop size can change whenever window size changes.
  useEffect(() => {
    const taskbar = document.getElementById(TASKBAR_ID);
    setTaskbarRect(taskbar?.getBoundingClientRect());
  }, [windowSizeStoreState.width, windowSizeStoreState.height]);

  return taskbarRect;
};
