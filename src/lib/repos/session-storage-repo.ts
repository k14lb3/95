import { createSessionStorageRepo } from '@lib';

export const sessionStorageRepo = {
  isBooted: createSessionStorageRepo<boolean>({ key: 'is-booted' }),
};
