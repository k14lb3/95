import { createSessionStorageRepo } from './session-storage-repo-factory';

export const sessionStorageRepo = {
  isBooted: createSessionStorageRepo<boolean>({ key: 'is-booted' }),
};
