import { SCREEN_ELEMENT_ID } from '@constants';
import { useState } from 'react';
import { useEventListener } from './use-event-listener';

export type MousePosition = {
  x: number;
  y: number;
};

export const useMousePosition = (): MousePosition => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const screenElement = document.getElementById(SCREEN_ELEMENT_ID);

  useEventListener({
    eventName: 'mousemove',
    handler: (event) => {
      if (!screenElement) {
        return;
      }

      const { left, top } = screenElement.getBoundingClientRect();

      setMousePosition({
        x: event.pageX - (left + globalThis.pageXOffset),
        y: event.pageY - (top + globalThis.pageYOffset),
      });
    },
  });

  return mousePosition;
};
