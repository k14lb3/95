import type { StorageValue } from '@types';

export const safeParse = <T extends StorageValue>(
  jsonString: string,
): T | null => {
  try {
    return JSON.parse(jsonString) as T;
  } catch {
    return null;
  }
};
