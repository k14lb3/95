import { useState } from 'react';
import { useEventListener } from './use-event-listener';

export type MousePosition = {
  x: number;
  y: number;
};

export const useMousePosition = (): MousePosition => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const bodyElement = document.body;

  useEventListener({
    eventName: 'mousemove',
    handler: (event) => {
      if (!bodyElement) {
        return;
      }

      const { left, top } = bodyElement.getBoundingClientRect();

      setMousePosition({
        x: event.pageX - (left + globalThis.pageXOffset),
        y: event.pageY - (top + globalThis.pageYOffset),
      });
    },
  });

  return mousePosition;
};
