import { createSessionStorageRepo } from './storage-repo';

export const sessionStorageRepo = {
  isBooted: createSessionStorageRepo<boolean>({ key: 'is-booted' }),
};
