import type { PlainObject } from './utils/plain-object';

export type StorageValue =
  | string
  | number
  | boolean
  | PlainObject
  | StorageValue[]
  | null;
