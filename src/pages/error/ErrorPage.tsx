import { Danger, Refresh } from 'iconsax-react';
import React from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';

export const ErrorPage: React.FC = () => {
  const error = useRouteError();
  let errorMessage = 'Đã xảy ra lỗi không xác định.';

  if (isRouteErrorResponse(error)) {
    errorMessage = `${error.status} ${error.statusText}`;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
      <div className="flex size-20 items-center justify-center rounded-full bg-destructive/10 text-destructive mb-6">
        <Danger size={48} variant="Bold" />
      </div>
      <h1 className="text-3xl font-bold text-foreground mb-2">Đã có lỗi xảy ra</h1>
      <p className="text-muted-foreground max-w-md mb-4">{errorMessage}</p>
      <Button variant="default" onClick={() => window.location.reload()} className="gap-2">
        <Refresh size={18} />
        <span>Tải lại trang</span>
      </Button>
    </div>
  );
};
