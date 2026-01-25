import * as stylex from '@stylexjs/stylex';

export const cursor = stylex.defineConsts({
  none: 'none' as const,
  default: 'url(/images/icons/cursor-default.png), default' as 'default',
  pointer: 'url(/images/icons/cursor-pointer.png), pointer' as 'pointer',
  wait: 'url(/images/icons/cursor-wait.png), wait' as 'wait',
  progress: 'url(/images/icons/cursor-progress.png), progress' as 'progress',
  'ew-resize':
    'url(/images/icons/cursor-ew-resize.png), ew-resize' as 'ew-resize',
  'ns-resize':
    'url(/images/icons/cursor-ns-resize.png), ns-resize' as 'ns-resize',
  'nesw-resize':
    'url(/images/icons/cursor-nesw-resize.png), nesw-resize' as 'nesw-resize',
  'nwse-resize':
    'url(/images/icons/cursor-nwse-resize.png), nwse-resize' as 'nswse-resive',
});
