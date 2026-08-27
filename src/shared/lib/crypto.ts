import CryptoJS from 'crypto-js';

import { env } from '@/shared/config/env';

const SECRET = env.CRYPTO_SECRET;

export const crypto = {
  encrypt(value: unknown): string {
    const text = typeof value === 'string' ? value : JSON.stringify(value);
    return CryptoJS.AES.encrypt(text, SECRET).toString();
  },
  decrypt<T = string>(cipher: string): T | null {
    try {
      const bytes = CryptoJS.AES.decrypt(cipher, SECRET);
      const text = bytes.toString(CryptoJS.enc.Utf8);
      if (!text) return null;
      try {
        return JSON.parse(text) as T;
      } catch {
        return text as T;
      }
    } catch {
      return null;
    }
  },
};
