import { storageFactory } from './storage-factory';

export const sessionStorageRepo = {
  isBooted: storageFactory.createSessionStorage<boolean>('is-booted'),
};
