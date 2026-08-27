type RuntimeConfig = NonNullable<Window['__APP_CONFIG__']>;
type EnvKey = keyof RuntimeConfig;

const getEnv = (key: EnvKey, fallback?: string): string => {
  const runtimeConfig = typeof window === 'undefined' ? undefined : window.__APP_CONFIG__;
  const value = runtimeConfig?.[key] ?? import.meta.env[key] ?? fallback;
  if (value === undefined) return fallback ?? '';
  return value;
};

export const env = {
  API_URL: getEnv('VITE_API_URL', 'http://localhost:8080/api'),
  CRYPTO_SECRET: getEnv('VITE_CRYPTO_SECRET', 'dev-secret-change-me'),
  APP_ENV: getEnv('VITE_APP_ENV', 'development') as 'development' | 'staging' | 'production',
} as const;

export const SHOW_DEV_ROUTES = import.meta.env.DEV || env.APP_ENV === 'development';
