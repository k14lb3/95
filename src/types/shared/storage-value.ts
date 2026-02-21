import type { PlainObject } from '../utils';

export type StorageValue =
  | string
  | number
  | boolean
  | PlainObject
  | StorageValue[]
  | null;
