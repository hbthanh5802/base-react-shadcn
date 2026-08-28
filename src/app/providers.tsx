import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { CloseCircle, Danger, InfoCircle, TickCircle } from 'iconsax-react';
import { type ReactNode, Suspense } from 'react';
import { I18nextProvider } from 'react-i18next';
import { Toaster } from 'sonner';

import { ThemeProvider } from '@/shared/components/theme-provider';
import { ConfirmProvider } from '@/shared/components/ui/confirm-dialog';
import i18n from '@/shared/i18n';
import { queryClient } from '@/shared/lib/query-client';

interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => (
  <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Đang tải...</div>}>
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <ConfirmProvider>
            {children}
          </ConfirmProvider>
          <Toaster
            position="top-right"
            closeButton={false}
            icons={{
              info: <InfoCircle size={22} variant="Bold" className="text-blue-600 dark:text-blue-400 shrink-0" />,
              success: <TickCircle size={22} variant="Bold" className="text-emerald-600 dark:text-emerald-400 shrink-0" />,
              warning: <Danger size={22} variant="Bold" className="text-amber-600 dark:text-amber-400 shrink-0" />,
              error: <CloseCircle size={22} variant="Bold" className="text-red-600 dark:text-red-400 shrink-0" />,
            }}
          />
        </ThemeProvider>
        {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </I18nextProvider>
  </Suspense>
);

export default Providers;
