import { DEFAULTS } from '@constants';
import { localStorageRepo } from '@lib';
import {
  useFileSystemObjectStoreAction,
  useFileSystemObjectStoreState,
} from '@stores';
import type { JSX } from 'react';
import { LocalStorageSyncer } from './local-storage-syncer';

export const FileSystemObjectsLocalStorageSyncer = (): JSX.Element => {
  const fileSystemObjectStoreState = useFileSystemObjectStoreState();
  const fileSystemObjectStoreAction = useFileSystemObjectStoreAction();

  return (
    <LocalStorageSyncer
      value={fileSystemObjectStoreState.fileSystemObjects}
      defaultValue={DEFAULTS.FILE_SYSTEM_OBJECTS}
      setter={({ value }) => {
        fileSystemObjectStoreAction.set({ fileSystemObjects: value });
      }}
      repo={localStorageRepo.fileSystemObjects}
    />
  );
};
