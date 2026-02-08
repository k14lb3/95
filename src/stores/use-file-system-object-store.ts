import { localStorageRepo } from '@lib';
import type { FileSystemObject, Position } from '@types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export type FileSystemObjectStore = {
  state: {
    fileSystemObjects: FileSystemObject[];
  };
  action: {
    set: (args: { fileSystemObjects: FileSystemObject[] }) => void;
    add: (args: { fileSystemObject: FileSystemObject }) => void;
    remove: (args: { fileSystemObjectId: string }) => void;
    move: (args: { fileSystemObjectId: string; position: Position }) => void;
  };
};

const store = create<FileSystemObjectStore>()(
  persist(
    immer((set) => {
      return {
        state: {
          fileSystemObjects: [],
        },
        action: {
          set: ({ fileSystemObjects }) => {
            return set((store) => {
              store.state.fileSystemObjects = fileSystemObjects;
            });
          },
          add: ({ fileSystemObject }) => {
            set((store) => {
              store.state.fileSystemObjects.push(fileSystemObject);
            });
          },
          remove: ({ fileSystemObjectId }) => {
            set((store) => {
              store.state.fileSystemObjects.filter((fileSystemObject) => {
                return fileSystemObject.id !== fileSystemObjectId;
              });
            });
          },
          move: ({ fileSystemObjectId, position }) => {
            return set(({ state }) => {
              const fileSystemObject = state.fileSystemObjects.find(
                (fileSystemObject) => {
                  return fileSystemObject.id === fileSystemObjectId;
                },
              );

              if (!fileSystemObject) {
                return;
              }

              fileSystemObject.position = position;
            });
          },
        },
      };
    }),
    {
      name: localStorageRepo.fileSystemObjects.getKey(),
      storage: createJSONStorage(() => {
        return globalThis.localStorage;
      }),
      partialize: (store) => {
        return {
          state: store.state,
        };
      },
    },
  ),
);

export const useFileSystemObjectStoreState =
  (): FileSystemObjectStore['state'] => {
    return store((store) => {
      return store.state;
    });
  };

export const useFileSystemObjectStoreAction =
  (): FileSystemObjectStore['action'] => {
    return store((store) => {
      return store.action;
    });
  };
