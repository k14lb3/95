import type { StorageValue } from '@types';
import { StorageRepo } from './storage-repo';

export const createLocalStorageRepo = <T extends StorageValue>({
  key,
}: {
  key: string;
}): StorageRepo<T> => {
  return new StorageRepo({ storage: globalThis.localStorage, key });
};
