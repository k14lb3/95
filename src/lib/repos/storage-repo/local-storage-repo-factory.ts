import type { PlainObject } from '@types';
import { StorageRepo } from './storage-repo';

export const createLocalStorageRepo = <
  T extends string | number | boolean | PlainObject | null,
>({
  key,
}: {
  key: string;
}): StorageRepo<T> => {
  return new StorageRepo({ storage: globalThis.localStorage, key });
};
