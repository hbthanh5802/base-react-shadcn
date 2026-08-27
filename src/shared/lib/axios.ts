import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import qs from 'qs';

import { env } from '@/shared/config/env';
import { useAuthStore } from '@/shared/stores/auth.store';
import type { ApiErrorResponse } from '@/shared/types/api.type';

interface RetryableConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
  _skipAuthRedirect?: boolean;
}

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: env.API_URL,
  timeout: 30_000,
  headers: { 'Content-Type': 'application/json' },
  paramsSerializer: {
    serialize: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
  },
});

axiosInstance.interceptors.request.use(async (config: RetryableConfig) => {
  const token = useAuthStore.getState().accessToken;

  if (token && config.headers && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const backendData = error.response?.data as ApiErrorResponse | undefined;
    if (backendData && backendData.success === false) {
      error.message = backendData.message;
    }

    const originalRequest = error.config as RetryableConfig | undefined;
    if (!originalRequest || !error.response) return Promise.reject(error);

    const { status } = error.response;
    if (status !== 401 || originalRequest._retry || originalRequest._skipAuthRedirect) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;
    useAuthStore.getState().logout();
    window.location.href = '/login';
    return Promise.reject(error);
  },
);

export const http = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    axiosInstance.get<T, AxiosResponse<T>>(url, config).then((res) => res.data),
  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    axiosInstance.post<T, AxiosResponse<T>>(url, data, config).then((res) => res.data),
  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    axiosInstance.put<T, AxiosResponse<T>>(url, data, config).then((res) => res.data),
  patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    axiosInstance.patch<T, AxiosResponse<T>>(url, data, config).then((res) => res.data),
  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    axiosInstance.delete<T, AxiosResponse<T>>(url, config).then((res) => res.data),
};
