import { safeParse } from '@lib';
import type { SessionStorageKey, SessionStorageSchema } from '@types';

const get = <Key extends SessionStorageKey>({
  key,
}: {
  key: Key;
}): SessionStorageSchema[Key] | null => {
  const storedValue = window.sessionStorage.getItem(key);
  if (storedValue === null) {
    return null;
  }

  return safeParse<SessionStorageSchema[Key]>(storedValue);
};

const set = <Key extends SessionStorageKey>({
  key,
  value,
}: {
  key: Key;
  value: SessionStorageSchema[Key];
}): void => {
  window.sessionStorage.setItem(key, JSON.stringify(value));
};

const remove = <Key extends SessionStorageKey>({ key }: { key: Key }): void => {
  window.sessionStorage.removeItem(key);
};

export const sessionStorage = {
  get,
  set,
  remove,
};
