import { safeParse } from '@lib';
import type { LocalStorageKey, LocalStorageSchema } from '@types';

const get = <Key extends LocalStorageKey>({
  key,
}: {
  key: Key;
}): LocalStorageSchema[Key] | null => {
  const storedValue = window.localStorage.getItem(key);
  if (storedValue === null) {
    return null;
  }

  return safeParse<LocalStorageSchema[Key]>(storedValue);
};

const set = <Key extends LocalStorageKey>({
  key,
  value,
}: {
  key: Key;
  value: LocalStorageSchema[Key];
}): void => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

const remove = <Key extends LocalStorageKey>({ key }: { key: Key }): void => {
  window.localStorage.removeItem(key);
};

export const localStorage = {
  get,
  set,
  remove,
};
