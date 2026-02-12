import { BASE_VIEWPORT_HEIGHT } from '@constants';

export const getViewportToDesignScale = ({ px }: { px: number }): number => {
  return px / (globalThis.innerHeight / BASE_VIEWPORT_HEIGHT);
};
