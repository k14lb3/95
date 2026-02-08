import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export type DragStore = {
  state: {
    draggedId: string | null;
  };
  action: {
    drag: (args: { draggedId: string }) => void;
    drop: () => void;
  };
};

const store = create<DragStore>()(
  immer((set) => {
    return {
      state: {
        draggedId: null,
      },
      action: {
        drag: ({ draggedId }) => {
          set((store) => {
            store.state.draggedId = draggedId;
          });
        },
        drop: () => {
          set((store) => {
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
