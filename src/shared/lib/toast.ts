import axios from 'axios';
import { toast } from 'sonner';

import i18n from '@/shared/i18n';

export const showApiResponseErrorMessage = (error: unknown, fallback?: string) => {
  const actualFallback = fallback ?? i18n.t('common:errors.occurred');

  let displayMessage = actualFallback;

  if (error && axios.isAxiosError(error)) {
    displayMessage = error.message;
  } else if (error && typeof error === 'object' && error !== null && 'message' in error) {
    const message = error.message;

    if (typeof message === 'string') {
      displayMessage = message;
    }
  } else if (error && typeof error === 'string') {
    displayMessage = error;
  }

  return toast.error(displayMessage);
};
