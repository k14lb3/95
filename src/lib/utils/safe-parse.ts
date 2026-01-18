import type { PlainObject } from '@types';

export const safeParse = <
  T extends string | number | boolean | null | PlainObject,
>(
  jsonString: string,
): T | null => {
  try {
    return JSON.parse(jsonString) as T;
  } catch {
    return null;
  }
};
