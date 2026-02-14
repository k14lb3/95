import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export type WindowSizeStore = {
  state: {
    width: number;
    height: number;
  };
  action: {
    set: (args: { width: number; height: number }) => void;
  };
};

const store = create<WindowSizeStore>()(
  immer((set) => {
    return {
      state: {
        width: globalThis.innerWidth,
        height: globalThis.innerHeight,
      },
      action: {
        set: ({ width, height }) => {
          set((store) => {
            store.state.width = width;
            store.state.height = height;
          });
        },
      },
    };
  }),
);

export const useWindowSizeStoreState = (): WindowSizeStore['state'] => {
  return store((store) => {
    return store.state;
  });
};

export const useWindowSizeStoreAction = (): WindowSizeStore['action'] => {
  return store((store) => {
    return store.action;
  });
};
