import { TASKBAR_ID } from '@constants';
import { useEffect, useState } from 'react';
import { useWindowSize } from './use-window-size';

export const useTaskbarRect = (): DOMRect | undefined => {
  const windowSize = useWindowSize();
  const [taskbarRect, setTaskbarRect] = useState<DOMRect>();

  // biome-ignore lint/correctness/useExhaustiveDependencies: Desktop size can change whenever window size changes.
  useEffect(() => {
    const taskbar = document.getElementById(TASKBAR_ID);
    setTaskbarRect(taskbar?.getBoundingClientRect());
  }, [windowSize.width, windowSize.height]);

  return taskbarRect;
};
