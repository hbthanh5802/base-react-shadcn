import { cva, type VariantProps } from 'class-variance-authority';
import { Copy, Check } from 'lucide-react';
import * as React from 'react';
import { useState } from 'react';
import { toast } from 'sonner';

import { cn } from '@/shared/lib/utils';

export const typographyVariants = cva('text-foreground font-sans transition-colors', {
  variants: {
    variant: {
      'heading-1': 'text-heading-1 font-bold tracking-tight',
      'heading-2': 'text-heading-2 font-bold tracking-tight',
      'heading-3': 'text-heading-3 font-bold tracking-tight',
      'heading-3-1': 'text-heading-3-1 font-semibold tracking-tight',

      'title-1': 'text-title-1 font-bold',
      'title-1-sb': 'text-title-1-sb font-semibold',
      'title-2': 'text-title-2 font-bold',
      'title-2-sb': 'text-title-2-sb font-semibold',
      'title-2-rg': 'text-title-2-rg font-normal',
      'title-3': 'text-title-3 font-bold',
      'title-3-sb': 'text-title-3-sb font-semibold',
      'title-3-rg': 'text-title-3-rg font-normal',

      'body-1': 'text-body-1 font-bold leading-relaxed',
      'body-1-sb': 'text-body-1-sb font-semibold leading-relaxed',
      'body-1-rg': 'text-body-1-rg font-normal leading-relaxed',
      'body-2': 'text-body-2 font-bold leading-normal',
      'body-2-sb': 'text-body-2-sb font-semibold leading-normal',
      'body-2-rg': 'text-body-2-rg font-normal leading-normal',
      'body-3': 'text-body-3 font-bold leading-tight',
      'body-3-sb': 'text-body-3-sb font-semibold leading-tight',
      'body-3-rg': 'text-body-3-rg font-normal leading-tight',

      lead: 'text-[18px] leading-[28px] text-muted-foreground font-normal',
      caption: 'text-[12px] leading-[16px] text-muted-foreground font-normal',
      code: 'font-mono text-[13px] bg-muted/60 text-foreground px-1.5 py-0.5 rounded-md border border-border/60',
      kbd: 'font-mono text-[11px] font-medium bg-muted/80 text-muted-foreground px-1.5 py-0.5 rounded border border-border shadow-2xs inline-flex items-center gap-1',
      blockquote: 'border-l-4 border-primary/60 bg-muted/20 py-2.5 px-4 italic text-foreground rounded-r-lg',
    },
    color: {
      default: '',
      muted: 'text-muted-foreground',
      primary: 'text-primary',
      success: 'text-emerald-600 dark:text-emerald-400',
      warning: 'text-amber-600 dark:text-amber-400',
      destructive: 'text-destructive',
      white: 'text-white',
      inherit: 'text-inherit',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    },
    italic: {
      true: 'italic',
      false: '',
    },
    underline: {
      true: 'underline underline-offset-4',
      false: '',
    },
    strikethrough: {
      true: 'line-through opacity-70',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'body-2-rg',
    color: 'default',
  },
});

export type TypographyVariant = NonNullable<VariantProps<typeof typographyVariants>['variant']>;
export type TypographyColor = NonNullable<VariantProps<typeof typographyVariants>['color']>;
export type TypographyWeight = NonNullable<VariantProps<typeof typographyVariants>['weight']>;
export type TypographyAlign = NonNullable<VariantProps<typeof typographyVariants>['align']>;

const defaultElementMap: Record<TypographyVariant, React.ElementType> = {
  'heading-1': 'h1',
  'heading-2': 'h2',
  'heading-3': 'h3',
  'heading-3-1': 'h3',
  'title-1': 'h4',
  'title-1-sb': 'h4',
  'title-2': 'h5',
  'title-2-sb': 'h5',
  'title-2-rg': 'h5',
  'title-3': 'h6',
  'title-3-sb': 'h6',
  'title-3-rg': 'h6',
  'body-1': 'p',
  'body-1-sb': 'p',
  'body-1-rg': 'p',
  'body-2': 'p',
  'body-2-sb': 'p',
  'body-2-rg': 'p',
  'body-3': 'span',
  'body-3-sb': 'span',
  'body-3-rg': 'span',
  lead: 'p',
  caption: 'span',
  code: 'code',
  kbd: 'kbd',
  blockquote: 'blockquote',
};

const clampClassMap: Record<number, string> = {
  1: 'truncate block',
  2: 'line-clamp-2',
  3: 'line-clamp-3',
  4: 'line-clamp-4',
  5: 'line-clamp-5',
};

export interface TypographyProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color'>,
    VariantProps<typeof typographyVariants> {
  /**
   * Thẻ HTML tùy biến (h1-h6, p, span, div, code, kbd, blockquote, etc.)
   */
  as?: React.ElementType;
  /**
   * Cắt bớt văn bản quá dài bằng dấu 3 chấm (true: 1 dòng, 2-5: số dòng)
   */
  truncate?: boolean | 1 | 2 | 3 | 4 | 5;
  /**
   * Bật nút sao chép nhanh văn bản 1-chạm kèm Toast
   */
  copyable?: boolean | { text?: string; onCopy?: () => void };
}

const TypographyBase = React.forwardRef<HTMLElement, TypographyProps>(
  (
    {
      as,
      variant = 'body-2-rg',
      color,
      weight,
      align,
      italic,
      underline,
      strikethrough,
      truncate,
      copyable,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [copied, setCopied] = useState(false);
    const Component = as ?? defaultElementMap[variant ?? 'body-2-rg'] ?? 'p';

    const clampClass =
      typeof truncate === 'boolean'
        ? truncate
          ? 'truncate block'
          : undefined
        : typeof truncate === 'number'
          ? clampClassMap[truncate]
          : undefined;

    const handleCopy = (e: React.MouseEvent) => {
      e.stopPropagation();
      const textToCopy =
        typeof copyable === 'object' && copyable.text
          ? copyable.text
          : typeof children === 'string'
            ? children
            : '';

      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        if (typeof copyable === 'object' && copyable.onCopy) {
          copyable.onCopy();
        } else {
          toast.success('Đã sao chép vào bộ nhớ tạm!');
        }
        setTimeout(() => setCopied(false), 2000);
      }
    };

    if (copyable) {
      return (
        <span className="inline-flex items-center gap-1.5 group max-w-full">
          <Component
            ref={ref}
            className={cn(
              typographyVariants({
                variant,
                color,
                weight,
                align,
                italic,
                underline,
                strikethrough,
              }),
              clampClass,
              className,
            )}
            {...props}
          >
            {children}
          </Component>
          <button
            type="button"
            onClick={handleCopy}
            className="shrink-0 p-1 text-muted-foreground opacity-60 hover:opacity-100 hover:text-foreground rounded transition-all cursor-pointer"
            aria-label="Sao chép"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </button>
        </span>
      );
    }

    return (
      <Component
        ref={ref}
        className={cn(
          typographyVariants({
            variant,
            color,
            weight,
            align,
            italic,
            underline,
            strikethrough,
          }),
          clampClass,
          className,
        )}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

TypographyBase.displayName = 'Typography';

// ── Shortcut Sub-components ──

export interface HeadingProps extends Omit<TypographyProps, 'variant'> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

const Heading: React.FC<HeadingProps> = ({ level = 1, as, ...props }) => {
  const variantMap: Record<number, TypographyVariant> = {
    1: 'heading-1',
    2: 'heading-2',
    3: 'heading-3',
    4: 'title-1',
    5: 'title-2',
    6: 'title-3',
  };
  const tagMap: Record<number, React.ElementType> = {
    1: 'h1',
    2: 'h2',
    3: 'h3',
    4: 'h4',
    5: 'h5',
    6: 'h6',
  };
  return <TypographyBase as={as ?? tagMap[level]} variant={variantMap[level]} {...props} />;
};

export interface TitleProps extends Omit<TypographyProps, 'variant' | 'weight'> {
  level?: 1 | 2 | 3;
  weight?: 'bold' | 'semibold' | 'regular' | 'normal' | 'medium';
}

const Title: React.FC<TitleProps> = ({ level = 1, weight = 'bold', as, ...props }) => {
  let variant: TypographyVariant = 'title-1';
  if (level === 1) variant = weight === 'semibold' ? 'title-1-sb' : 'title-1';
  if (level === 2) {
    if (weight === 'semibold') variant = 'title-2-sb';
    else if (weight === 'regular' || weight === 'normal') variant = 'title-2-rg';
    else variant = 'title-2';
  }
  if (level === 3) {
    if (weight === 'semibold') variant = 'title-3-sb';
    else if (weight === 'regular' || weight === 'normal') variant = 'title-3-rg';
    else variant = 'title-3';
  }
  const tagMap: Record<number, React.ElementType> = { 1: 'h4', 2: 'h5', 3: 'h6' };
  return <TypographyBase as={as ?? tagMap[level]} variant={variant} {...props} />;
};

export interface TextProps extends TypographyProps {}
const Text: React.FC<TextProps> = (props) => <TypographyBase as="span" variant="body-2-rg" {...props} />;

export interface ParagraphProps extends TypographyProps {}
const Paragraph: React.FC<ParagraphProps> = ({ className, ...props }) => (
  <TypographyBase as="p" variant="body-2-rg" className={cn('mb-3 last:mb-0', className)} {...props} />
);

export interface LeadProps extends TypographyProps {}
const Lead: React.FC<LeadProps> = (props) => <TypographyBase as="p" variant="lead" {...props} />;

export interface CaptionProps extends TypographyProps {}
const Caption: React.FC<CaptionProps> = (props) => <TypographyBase as="span" variant="caption" {...props} />;

export interface CodeProps extends TypographyProps {}
const Code: React.FC<CodeProps> = (props) => <TypographyBase as="code" variant="code" {...props} />;

export interface KbdProps extends TypographyProps {}
const Kbd: React.FC<KbdProps> = (props) => <TypographyBase as="kbd" variant="kbd" {...props} />;

export interface BlockquoteProps extends TypographyProps {}
const Blockquote: React.FC<BlockquoteProps> = (props) => (
  <TypographyBase as="blockquote" variant="blockquote" {...props} />
);

export interface LinkProps extends TypographyProps {
  href?: string;
  target?: string;
  rel?: string;
}
const Link: React.FC<LinkProps> = ({ href, className, children, ...props }) => (
  <TypographyBase
    as="a"
    color="primary"
    className={cn('hover:underline underline-offset-4 cursor-pointer font-medium', className)}
    {...(href ? { href } : {})}
    {...props}
  >
    {children}
  </TypographyBase>
);

// Compound Component Interface
export interface TypographyComponentType
  extends React.ForwardRefExoticComponent<TypographyProps & React.RefAttributes<HTMLElement>> {
  Heading: typeof Heading;
  Title: typeof Title;
  Text: typeof Text;
  Paragraph: typeof Paragraph;
  Lead: typeof Lead;
  Caption: typeof Caption;
  Code: typeof Code;
  Kbd: typeof Kbd;
  Blockquote: typeof Blockquote;
  Link: typeof Link;
}

export const Typography: TypographyComponentType = Object.assign(TypographyBase, {
  Heading,
  Title,
  Text,
  Paragraph,
  Lead,
  Caption,
  Code,
  Kbd,
  Blockquote,
  Link,
});

export { Typography as TextSystem };
export default Typography;
