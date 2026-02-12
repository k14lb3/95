import { getViewportToDesignScale } from './get-viewport-to-design-scale';

export function viewportToDesignPx({ px }: { px: number }): number {
  return getViewportToDesignScale({ px });
}
