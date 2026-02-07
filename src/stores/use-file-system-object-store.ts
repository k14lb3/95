import { localStorageRepo } from '@lib';
import type { FileSystemObject } from '@types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { useShallow } from 'zustand/react/shallow';

export type FileSystemObjectStore = {
  fileSystemObjects: FileSystemObject[];
  set: (args: { fileSystemObjects: FileSystemObject[] }) => void;
  add: (args: { fileSystemObject: FileSystemObject }) => void;
  remove: (args: { fileSystemObjectId: string }) => void;
  get: (args: { fileSystemObjectId: string }) => FileSystemObject | undefined;
  getAll: () => FileSystemObject[];
  getAllByParentId: (args: {
    parentId: FileSystemObject['parentId'];
  }) => FileSystemObject[];
};

export const useFileSystemObjectStore = () => {
  return create(
    persist(
      immer<FileSystemObjectStore>((set, get) => {
        return {
          fileSystemObjects: [],
          set: ({ fileSystemObjects }) => {
            return set({ fileSystemObjects });
          },
          add: ({ fileSystemObject }) => {
            return set((state) => {
              state.fileSystemObjects.push(fileSystemObject);
            });
          },
          remove: ({ fileSystemObjectId }) => {
            return get().fileSystemObjects.filter((fileSystemObject) => {
              return fileSystemObject.id !== fileSystemObjectId;
            });
          },
          get: ({ fileSystemObjectId }) => {
            return get().fileSystemObjects.find((fileSystemObject) => {
              return fileSystemObject.id === fileSystemObjectId;
            });
          },
          getAll: () => {
            return get().fileSystemObjects;
          },
          getAllByParentId: ({ parentId }) => {
            return get().fileSystemObjects.filter((fileSystemObject) => {
              return fileSystemObject.parentId === parentId;
            });
          },
        };
      }),
      {
        name: localStorageRepo.fileSystemObjects.getKey(),
        storage: createJSONStorage(() => {
          return globalThis.localStorage;
        }),
      },
    ),
  )(
    useShallow((state) => ({
      set: state.set,
      add: state.add,
      remove: state.remove,
      get: state.get,
      getAll: state.getAll,
      getAllByParentId: state.getAllByParentId,
    })),
  );
};
