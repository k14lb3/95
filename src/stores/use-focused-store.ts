import type { DesktopId, TaskbarId } from '@types';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export type FocusedStore = {
  state: {
    focusedId: DesktopId | TaskbarId | (string & {}) | null;
  };
  action: {
    focus: (args: { focusedId: DesktopId | TaskbarId | (string & {}) }) => void;
  };
};

const store = create<FocusedStore>()(
  immer((set) => {
    return {
      state: {
        focusedId: null,
      },
      action: {
        focus: ({ focusedId }) => {
          set((store) => {
            store.state.focusedId = focusedId;
          });
        },
      },
    };
  }),
);

export const useFocusedStoreState = (): FocusedStore['state'] => {
  return store((store) => {
    return store.state;
  });
};

export const useFocusedStoreAction = (): FocusedStore['action'] => {
  return store((store) => {
    return store.action;
  });
};
