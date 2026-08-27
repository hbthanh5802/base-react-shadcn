import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/shared/lib/utils';

export interface ImageSource {
  media?: string;
  srcSet: string;
  type?: string;
  sizes?: string;
}

const imageVariants = cva('max-w-full', {
  variants: {
    variant: {
      default: '',
      product: 'rounded-lg object-cover',
      thumbnail: 'rounded-md object-cover',
      hero: 'w-full object-cover',
      avatar: 'rounded-full object-cover',
    },
    fit: {
      cover: 'object-cover',
      contain: 'object-contain',
      fill: 'object-fill',
      none: 'object-none',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface ImageProps
  extends
    Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'placeholder'>,
    VariantProps<typeof imageVariants> {
  src: string;
  alt?: string;
  /** AVIF source — served first when browser supports it */
  avifSrc?: string;
  /** WebP source — served when AVIF is unsupported */
  webpSrc?: string;
  /** Art-direction / responsive sources rendered as <source> elements */
  sources?: ImageSource[];
  /** Marks this as an LCP image: eager loading, fetchpriority=high, preload link */
  priority?: boolean;
  /** Enable blur-up progressive loading (requires `placeholder`) */
  progressive?: boolean;
  /** URL of a tiny/blurred placeholder image for blur-up transition */
  placeholder?: string;
  /** Fallback src used when the main src fails to load */
  fallbackSrc?: string;
  /** Transition duration in ms for blur-up fade (default: 300) */
  placeholderDuration?: number;
}

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      src,
      alt = '',
      avifSrc,
      webpSrc,
      sources,
      priority = false,
      progressive = false,
      placeholder,
      fallbackSrc,
      variant,
      fit,
      className,
      placeholderDuration = 300,
      width,
      height,
      onLoad,
      onError,
      sizes,
      style,
      ...props
    },
    ref,
  ) => {
    const [loaded, setLoaded] = React.useState(false);
    const [hasError, setHasError] = React.useState(false);
    const [activeSrc, setActiveSrc] = React.useState(src);

    React.useEffect(() => {
      setActiveSrc(src);
      setLoaded(false);
      setHasError(false);
    }, [src]);

    // Inject <link rel="preload"> for LCP/hero images so the browser
    // fetches the best available format before the render tree is parsed.
    React.useEffect(() => {
      if (!priority) return;
      const link = document.createElement('link');
      link.setAttribute('rel', 'preload');
      link.setAttribute('as', 'image');
      link.setAttribute('href', avifSrc ?? webpSrc ?? src);
      if (avifSrc) link.setAttribute('type', 'image/avif');
      else if (webpSrc) link.setAttribute('type', 'image/webp');
      if (sizes) link.setAttribute('imagesizes', sizes);
      document.head.appendChild(link);
      return () => {
        document.head.removeChild(link);
      };
    }, [priority, src, avifSrc, webpSrc, sizes]);

    const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
      setLoaded(true);
      onLoad?.(e);
    };

    const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
      if (fallbackSrc && activeSrc !== fallbackSrc) {
        // Switch to fallback silently — don't surface the error yet.
        setActiveSrc(fallbackSrc);
        setLoaded(false);
        return;
      }
      setHasError(true);
      onError?.(e);
    };

    const hasPictureSources = !!(avifSrc || webpSrc || sources?.length);
    const showBlurUp = progressive && !!placeholder;
    const hasDimensions = !!(width && height);

    // needsWrapper is derived from props only (never from state) so the DOM
    // structure stays stable across the loading → loaded → error transitions.
    const needsWrapper = showBlurUp || (hasDimensions && !priority);

    const imgEl = (
      <img
        ref={ref}
        src={activeSrc}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : undefined}
        onLoad={handleLoad}
        onError={handleError}
        sizes={sizes}
        className={cn(
          imageVariants({ variant, fit }),
          // Keep img invisible while the wrapper shows skeleton/placeholder.
          // Show it again (without animation) on error so the broken-image
          // icon / alt text is still accessible.
          needsWrapper && (loaded || hasError ? 'opacity-100' : 'opacity-0'),
          // Blur-up: smooth opacity transition driven by CSS so it is GPU-composited.
          showBlurUp && 'transition-opacity',
          className,
        )}
        style={{
          // Use inline style for the user-configurable duration so we're not
          // limited to the fixed Tailwind duration scale.
          ...(showBlurUp && { transitionDuration: `${placeholderDuration}ms` }),
          ...style,
        }}
        {...props}
      />
    );

    // Progressive Enhancement Strategy: AVIF → WebP → fallback img
    // Custom `sources` are inserted first for art-direction / media queries.
    const pictureEl = hasPictureSources ? (
      <picture>
        {sources?.map((s, i) => (
          <source
            key={i}
            srcSet={s.srcSet}
            media={s.media}
            type={s.type}
            sizes={s.sizes ?? sizes}
          />
        ))}
        {avifSrc && <source srcSet={avifSrc} type="image/avif" />}
        {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
        {imgEl}
      </picture>
    ) : (
      imgEl
    );

    if (!needsWrapper) return pictureEl;

    return (
      <span
        style={{
          position: 'relative',
          display: 'inline-block',
          // Clip the scaled blur placeholder so it doesn't bleed outside the frame.
          overflow: showBlurUp ? 'hidden' : undefined,
          // Reserve the layout space so the skeleton matches image dimensions.
          width: hasDimensions ? width : undefined,
          height: hasDimensions ? height : undefined,
        }}
      >
        {/* Skeleton pulse — only when we know dimensions and no blur-up is active */}
        {hasDimensions && !showBlurUp && !loaded && !hasError && (
          <span aria-hidden className="absolute inset-0 animate-pulse rounded bg-neutral-100" />
        )}

        {/* Blur-up: tiny placeholder fades out as the full image fades in */}
        {showBlurUp && (
          <img
            src={placeholder}
            alt=""
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              // Slightly scale up to hide edge artifacts from the blur.
              filter: 'blur(20px)',
              transform: 'scale(1.05)',
              opacity: loaded || hasError ? 0 : 1,
              transition: `opacity ${placeholderDuration}ms ease-in-out`,
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          />
        )}

        {pictureEl}
      </span>
    );
  },
);

Image.displayName = 'Image';

export { Image, imageVariants };
