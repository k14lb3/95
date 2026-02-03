import { useEffect } from 'react';

export const useEventListener = <K extends keyof WindowEventMap>(args: {
  eventName: K;
  handler: (event: WindowEventMap[K]) => void;
  options?: AddEventListenerOptions;
}): void => {
  const { eventName, handler, options } = args;

  useEffect(() => {
    globalThis.addEventListener(eventName, handler, options);

    return () => {
      globalThis.removeEventListener(eventName, handler, options);
    };
  }, [eventName, handler, options]);
};
