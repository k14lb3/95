import { safeParse } from '@lib';
import type { PlainObject } from '@types';

const createStorageRepo = (storage: Storage) => {
  return <T extends string | number | boolean | PlainObject | null>(key: string) => ({
    get: (): T | null => {
      const storedValue = storage.getItem(key);

      if (storedValue === null) {
        return null;
      }

      return safeParse<T>(storedValue);
    },
    set: (value: T): void => {
      storage.setItem(key, JSON.stringify(value));
    },
    remove: (): void => {
      storage.removeItem(key);
    },
  });
};

export const storageFactory = {
  createLocalStorage: createStorageRepo(window.localStorage),
  createSessionStorage: createStorageRepo(window.sessionStorage),
};
