import { BASE_VIEWPORT_HEIGHT } from '@constants';

export function pxToVh({ px }: { px: number }): string {
  return `${(px / BASE_VIEWPORT_HEIGHT) * 100}vh`;
}
