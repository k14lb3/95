import type { PlainObject } from '@types';
import { StorageRepo } from './storage';

export const createSessionStorageRepo = <
  T extends string | number | boolean | PlainObject | null,
>({
  key,
}: {
  key: string;
}): StorageRepo<T> => {
  return new StorageRepo({ storage: globalThis.sessionStorage, key });
};
