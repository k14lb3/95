import type { PlainObject } from '@types';

export const omitUndefined = <T extends PlainObject>(
  obj: T,
): Partial<T> => {
  const result = {} as T;

  for (const key in obj) {
    if (obj[key] !== undefined) {
      result[key] = obj[key];
    }
  }

  return result as Partial<T>;
};
