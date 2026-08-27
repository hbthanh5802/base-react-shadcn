import { crypto } from './crypto';

export const storage = {
  set<T>(key: string, value: T): void {
    localStorage.setItem(key, crypto.encrypt(value));
  },
  get<T>(key: string): T | null {
    const raw = localStorage.getItem(key);
    return raw ? crypto.decrypt<T>(raw) : null;
  },
  remove(key: string): void {
    localStorage.removeItem(key);
  },
  clear(): void {
    localStorage.clear();
  },
};
