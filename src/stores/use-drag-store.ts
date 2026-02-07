import type { DesktopId } from '@types';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export type DragStore = {
  state: {
    isDragging: boolean;
    draggedId: string | null;
  };
  action: {
    drag: (args: { id: DesktopId | (string & {}) }) => void;
    drop: () => void;
  };
};

const store = create<DragStore>()(
  immer((set) => {
    return {
      state: {
        isDragging: false,
        draggedId: null,
      },
      action: {
        drag: ({ id }) => {
          set((store) => {
            store.state.isDragging = true;
            store.state.draggedId = id;
          });
        },
        drop: () => {
          set((store) => {
            store.state.isDragging = false;
            store.state.draggedId = null;
          });
        },
      },
    };
  }),
);

export const useDragStoreState = (): DragStore['state'] => {
  return store((store) => {
    return store.state;
  });
};

export const useDragStoreAction = (): DragStore['action'] => {
  return store((store) => {
    return store.action;
  });
};
