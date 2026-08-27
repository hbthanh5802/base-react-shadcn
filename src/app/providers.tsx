import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { CloseCircle, TickCircle } from 'iconsax-react';
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
              error: <CloseCircle className="size-6 shrink-0 text-[#DA251C]" variant="Bold" />,
              success: <TickCircle className="size-6 shrink-0 text-[#3EBB3E]" variant="Bold" />,
            }}
            toastOptions={{
              classNames: {
                toast:
                  '!min-h-12 !h-auto !items-start !gap-2.5 !rounded-lg !border !border-border !bg-popover !p-3 !shadow-lg !max-w-md',
                content: '!gap-1 !min-w-0 !flex-1 !break-words',
                icon: '!size-6 !shrink-0 !mt-0.5 !bg-transparent',
                title: '!text-body-2-rg !text-popover-foreground !break-words !whitespace-normal',
                description: '!text-body-2-rg !text-muted-foreground !break-words !whitespace-normal',
                error: '!bg-popover !text-popover-foreground',
                success: '!bg-popover !text-popover-foreground',
              },
            }}
          />
        </ThemeProvider>
        {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </I18nextProvider>
  </Suspense>
);
