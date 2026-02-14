import type * as stylex from '@stylexjs/stylex';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export type CursorStyleStore = {
  state: {
    cursorStyle: Readonly<{
      readonly cursor: stylex.StyleXClassNameFor<'cursor', string>;
    }> | null;
  };
  action: {
    set: (args: {
      cursorStyle: Readonly<{
        readonly cursor: stylex.StyleXClassNameFor<'cursor', string>;
      }> | null;
    }) => void;
  };
};

const store = create<CursorStyleStore>()(
  immer((set) => {
    return {
      state: {
        cursorStyle: null,
      },
      action: {
        set: ({ cursorStyle }) => {
          set((store) => {
            store.state.cursorStyle = cursorStyle;
          });
        },
      },
    };
  }),
);

export const useCursorStyleStoreState = (): CursorStyleStore['state'] => {
  return store((store) => {
    return store.state;
  });
};

export const useCursorStyleStoreAction = (): CursorStyleStore['action'] => {
  return store((store) => {
    return store.action;
  });
};
