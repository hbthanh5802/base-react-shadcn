import React, { type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

class ErrorBoundaryCore extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error): void {
    console.error('Unhandled React error:', error);
  }

  reset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} onRetry={this.reset} />;
    }

    return this.props.children;
  }
}

interface ErrorFallbackProps {
  error: Error | null;
  onRetry: () => void;
}

const ErrorFallback = ({ error, onRetry }: ErrorFallbackProps) => {
  const { t } = useTranslation('common');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-4 text-center">
      <h1 className="text-3xl font-bold text-destructive">{t('errors.occurred')}</h1>
      <p className="max-w-xl text-sm text-muted-foreground">
        {error?.message || t('errors.unknown')}
      </p>
      <div className="flex gap-2">
        <Button variant="outline" onClick={onRetry}>
          Retry
        </Button>
        <Button asChild>
          <Link to="/dashboard">{t('actions.backHome')}</Link>
        </Button>
      </div>
    </div>
  );
};

export const ErrorBoundary = ({ children }: ErrorBoundaryProps) => {
  return <ErrorBoundaryCore>{children}</ErrorBoundaryCore>;
};
