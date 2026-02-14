import type { BootStage } from '@types';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export type BootStageStore = {
  state: {
    bootStage: BootStage;
  };
  action: {
    set: (args: { bootStage: BootStage }) => void;
  };
};

const store = create<BootStageStore>()(
  immer((set) => {
    return {
      state: {
        bootStage: 'dos-loading',
      },
      action: {
        set: ({ bootStage }) => {
          set((store) => {
            store.state.bootStage = bootStage;
          });
        },
      },
    };
  }),
);

export const useBootStageStoreState = (): BootStageStore['state'] => {
  return store((store) => {
    return store.state;
  });
};

export const useBootStageStoreAction = (): BootStageStore['action'] => {
  return store((store) => {
    return store.action;
  });
};
