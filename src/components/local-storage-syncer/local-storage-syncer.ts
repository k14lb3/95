import type { StorageRepo } from '@lib';
import type { StorageValue } from '@types';
import { useEffect } from 'react';

type Props<T extends StorageValue> = {
  value: T | null;
  defaultValue: T;
  setter: (args: { value: T }) => void;
  repo: StorageRepo<T>;
};

export const LocalStorageSyncer = <T extends StorageValue>({
  value,
  defaultValue,
  repo,
  setter,
}: Props<T>): null => {
  // biome-ignore lint/correctness/useExhaustiveDependencies: setter is excluded to prevent re-runs.
  useEffect(() => {
    let value = repo.get();
    
    if (value == null || (Array.isArray(value) && value.length === 0)) {
      value = defaultValue;
    }

    setter({ value });
  }, [defaultValue, repo]);

  useEffect(() => {
    if (value === null) {
      return;
    }

    repo.set(value);
  }, [value, repo]);

  return null;
};
