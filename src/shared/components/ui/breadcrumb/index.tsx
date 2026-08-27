import { ChevronRight } from 'lucide-react';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { cn } from '@/shared/lib/utils';

interface BreadcrumbItemData {
  label: string;
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItemData[];
  onNavigate?: (
    index: number,
    item: BreadcrumbItemData,
    event: React.MouseEvent<HTMLElement>,
  ) => void;
}

const Breadcrumb = ({ items, className, onNavigate, ...props }: BreadcrumbProps) => {
  return (
    <nav aria-label="Breadcrumb" className={cn('w-fit', className)} {...props}>
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <React.Fragment key={`${item.label}-${index}`}>
              <li className="inline-flex items-center">
                {!isLast && (item.href || item.onClick || onNavigate) ? (
                  item.href ? (
                    <Link
                      to={item.href}
                      className="cursor-pointer text-body-1-rg text-neutral-350 transition-colors hover:text-neutral-550 dark:text-neutral-500 dark:hover:text-neutral-400"
                      onClick={(event) => {
                        item.onClick?.(event);
                        onNavigate?.(index, item, event);
                      }}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      className="cursor-pointer text-body-1-rg text-neutral-350 transition-colors hover:text-neutral-550 dark:text-neutral-500 dark:hover:text-neutral-400"
                      onClick={(event) => {
                        item.onClick?.(event);
                        onNavigate?.(index, item, event);
                      }}
                    >
                      {item.label}
                    </button>
                  )
                ) : (
                  <span
                    className={cn(
                      'text-body-1-rg',
                      isLast ? 'text-primary-500' : 'text-neutral-350 dark:text-neutral-500',
                    )}
                  >
                    {item.label}
                  </span>
                )}
              </li>

              {!isLast && (
                <li
                  aria-hidden="true"
                  className="inline-flex items-center text-neutral-300 dark:text-neutral-600"
                >
                  <ChevronRight size={18} />
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export { Breadcrumb };
export type { BreadcrumbItemData, BreadcrumbProps };
