import { safeParse } from '@lib';
import type { StorageValue } from '@types';

export class StorageRepo<T extends StorageValue> {
  private storage: globalThis.Storage;
  private key: string;

  public constructor({
    storage,
    key,
  }: { storage: globalThis.Storage; key: string }) {
    this.storage = storage;
    this.key = key;
  }

  public get(): T | null {
    const storedValue = this.storage.getItem(this.key);

    if (storedValue === null) {
      return null;
    }

    return safeParse<T>(storedValue);
  }

  public set(value: T): void {
    this.storage.setItem(this.key, JSON.stringify(value));
  }

  public remove(): void {
    this.storage.removeItem(this.key);
  }
}
