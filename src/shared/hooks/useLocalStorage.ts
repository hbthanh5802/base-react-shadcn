import { useCallback, useEffect, useState } from 'react';

import { storage } from '@/shared/lib/storage';

type SetValue<T> = T | ((prev: T) => T);

export function useLocalStorage<T>(key: string, initial: T): [T, (value: SetValue<T>) => void] {
  const [value, setValue] = useState<T>(() => {
    const stored = storage.get<T>(key);
    return stored !== null ? stored : initial;
  });

  const setStoredValue = useCallback(
    (next: SetValue<T>) => {
      setValue((prev) => {
        const resolved = next instanceof Function ? next(prev) : next;
        storage.set(key, resolved);
        return resolved;
      });
    },
    [key],
  );

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        const decrypted = storage.get<T>(key);
        if (decrypted !== null) setValue(decrypted);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [key]);

  return [value, setStoredValue];
}
