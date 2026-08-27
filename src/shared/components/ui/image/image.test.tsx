import { render, screen, fireEvent } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Image } from './index';

// ─── helpers ────────────────────────────────────────────────────────────────

/** Find the first <source> of a given MIME type inside a <picture>. */
const getSource = (container: HTMLElement, type: string) =>
  container.querySelector<HTMLSourceElement>(`source[type="${type}"]`);

/** The img the component exposes as [role="img"]. */
const getImg = (alt: string) => screen.getByRole('img', { name: alt });

// ─── Rendering ───────────────────────────────────────────────────────────────

describe('Image — rendering', () => {
  it('renders an img with the correct src and alt', () => {
    render(<Image src="/photo.jpg" alt="Photo" />);
    const img = getImg('Photo');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/photo.jpg');
  });

  it('defaults alt to an empty string', () => {
    render(<Image src="/photo.jpg" />);
    // alt="" images get role=presentation in ARIA; query by attribute instead
    expect(screen.getByAltText('')).toBeInTheDocument();
  });

  it('sets loading="lazy" by default', () => {
    render(<Image src="/photo.jpg" alt="Photo" />);
    expect(getImg('Photo')).toHaveAttribute('loading', 'lazy');
  });

  it('sets decoding="async" always', () => {
    render(<Image src="/photo.jpg" alt="Photo" />);
    expect(getImg('Photo')).toHaveAttribute('decoding', 'async');
  });

  it('forwards extra props to the img element', () => {
    render(<Image src="/photo.jpg" alt="Photo" data-testid="my-img" />);
    expect(screen.getByTestId('my-img')).toBeInTheDocument();
  });

  it('forwards ref to the img element', () => {
    const ref = createRef<HTMLImageElement>();
    render(<Image src="/photo.jpg" alt="Photo" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLImageElement);
    expect(ref.current?.tagName).toBe('IMG');
  });

  it('applies variant classes', () => {
    render(<Image src="/photo.jpg" alt="Photo" variant="product" width={200} height={200} />);
    const img = getImg('Photo');
    expect(img).toHaveClass('rounded-lg');
    expect(img).toHaveClass('object-cover');
  });

  it('applies fit classes', () => {
    render(<Image src="/photo.jpg" alt="Photo" fit="contain" />);
    expect(getImg('Photo')).toHaveClass('object-contain');
  });
});

// ─── Priority / LCP ──────────────────────────────────────────────────────────

describe('Image — priority', () => {
  it('sets loading="eager" when priority is true', () => {
    render(<Image src="/hero.jpg" alt="Hero" priority />);
    expect(getImg('Hero')).toHaveAttribute('loading', 'eager');
  });

  it('sets fetchPriority="high" when priority is true', () => {
    render(<Image src="/hero.jpg" alt="Hero" priority />);
    expect(getImg('Hero')).toHaveAttribute('fetchpriority', 'high');
  });

  it('injects a preload <link> for the best format', () => {
    render(<Image src="/hero.jpg" avifSrc="/hero.avif" alt="Hero" priority />);
    const link = document.head.querySelector<HTMLLinkElement>('link[rel="preload"]');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('as', 'image');
    // AVIF is preferred over the bare src
    expect(link).toHaveAttribute('href', '/hero.avif');
    expect(link).toHaveAttribute('type', 'image/avif');
  });

  it('preloads WebP when only webpSrc is supplied', () => {
    render(<Image src="/hero.jpg" webpSrc="/hero.webp" alt="Hero" priority />);
    const link = document.head.querySelector<HTMLLinkElement>('link[rel="preload"]');
    expect(link).toHaveAttribute('href', '/hero.webp');
    expect(link).toHaveAttribute('type', 'image/webp');
  });

  it('preloads bare src when no modern formats are supplied', () => {
    render(<Image src="/hero.jpg" alt="Hero" priority />);
    const link = document.head.querySelector<HTMLLinkElement>('link[rel="preload"]');
    expect(link).toHaveAttribute('href', '/hero.jpg');
  });

  it('removes the preload link on unmount', () => {
    const { unmount } = render(<Image src="/hero.jpg" alt="Hero" priority />);
    expect(document.head.querySelector('link[rel="preload"]')).toBeInTheDocument();
    unmount();
    expect(document.head.querySelector('link[rel="preload"]')).not.toBeInTheDocument();
  });
});

// ─── Picture / format sources ────────────────────────────────────────────────

describe('Image — picture sources', () => {
  it('wraps in <picture> when avifSrc is provided', () => {
    const { container } = render(<Image src="/img.jpg" avifSrc="/img.avif" alt="Img" />);
    expect(container.querySelector('picture')).toBeInTheDocument();
  });

  it('wraps in <picture> when webpSrc is provided', () => {
    const { container } = render(<Image src="/img.jpg" webpSrc="/img.webp" alt="Img" />);
    expect(container.querySelector('picture')).toBeInTheDocument();
  });

  it('wraps in <picture> when custom sources are provided', () => {
    const { container } = render(
      <Image
        src="/img.jpg"
        sources={[{ srcSet: '/mobile.jpg', media: '(max-width: 768px)' }]}
        alt="Img"
      />,
    );
    expect(container.querySelector('picture')).toBeInTheDocument();
  });

  it('does NOT render <picture> for a plain src-only image', () => {
    const { container } = render(<Image src="/img.jpg" alt="Img" />);
    expect(container.querySelector('picture')).not.toBeInTheDocument();
  });

  it('places AVIF source before WebP source', () => {
    const { container } = render(
      <Image src="/img.jpg" avifSrc="/img.avif" webpSrc="/img.webp" alt="Img" />,
    );
    const sources = container.querySelectorAll('source');
    expect(sources[0]).toHaveAttribute('type', 'image/avif');
    expect(sources[1]).toHaveAttribute('type', 'image/webp');
  });

  it('places custom sources before format sources', () => {
    const { container } = render(
      <Image
        src="/img.jpg"
        avifSrc="/img.avif"
        sources={[{ srcSet: '/mobile.jpg', media: '(max-width: 768px)' }]}
        alt="Img"
      />,
    );
    const sources = container.querySelectorAll('source');
    expect(sources[0]).toHaveAttribute('media', '(max-width: 768px)');
    expect(sources[1]).toHaveAttribute('type', 'image/avif');
  });

  it('sets the correct srcSet on each <source>', () => {
    const { container } = render(
      <Image src="/img.jpg" avifSrc="/img.avif" webpSrc="/img.webp" alt="Img" />,
    );
    expect(getSource(container, 'image/avif')).toHaveAttribute('srcset', '/img.avif');
    expect(getSource(container, 'image/webp')).toHaveAttribute('srcset', '/img.webp');
  });
});

// ─── Load callback ───────────────────────────────────────────────────────────

describe('Image — onLoad', () => {
  it('calls onLoad when the image fires a load event', () => {
    const onLoad = vi.fn();
    render(<Image src="/img.jpg" alt="Img" onLoad={onLoad} />);
    fireEvent.load(getImg('Img'));
    expect(onLoad).toHaveBeenCalledTimes(1);
  });
});

// ─── Error / fallback ────────────────────────────────────────────────────────

describe('Image — error fallback', () => {
  it('switches src to fallbackSrc when the primary src fails', () => {
    render(<Image src="/broken.jpg" alt="Img" fallbackSrc="/fallback.jpg" />);
    const img = getImg('Img');
    fireEvent.error(img);
    expect(img).toHaveAttribute('src', '/fallback.jpg');
  });

  it('does NOT call onError while switching to fallback', () => {
    const onError = vi.fn();
    render(<Image src="/broken.jpg" alt="Img" fallbackSrc="/fallback.jpg" onError={onError} />);
    fireEvent.error(getImg('Img'));
    expect(onError).not.toHaveBeenCalled();
  });

  it('calls onError when both src and fallback fail', () => {
    const onError = vi.fn();
    render(<Image src="/broken.jpg" alt="Img" fallbackSrc="/also-broken.jpg" onError={onError} />);
    const img = getImg('Img');
    fireEvent.error(img); // original fails → switches to fallback
    fireEvent.error(img); // fallback also fails
    expect(onError).toHaveBeenCalledTimes(1);
  });

  it('calls onError immediately when there is no fallback', () => {
    const onError = vi.fn();
    render(<Image src="/broken.jpg" alt="Img" onError={onError} />);
    fireEvent.error(getImg('Img'));
    expect(onError).toHaveBeenCalledTimes(1);
  });
});

// ─── Skeleton loading state ──────────────────────────────────────────────────

describe('Image — skeleton', () => {
  it('renders skeleton pulse when width and height are provided', () => {
    const { container } = render(<Image src="/img.jpg" alt="Img" width={400} height={300} />);
    expect(container.querySelector('.animate-pulse')).toBeInTheDocument();
  });

  it('does NOT render skeleton without explicit dimensions', () => {
    const { container } = render(<Image src="/img.jpg" alt="Img" />);
    expect(container.querySelector('.animate-pulse')).not.toBeInTheDocument();
  });

  it('removes skeleton after image loads', () => {
    const { container } = render(<Image src="/img.jpg" alt="Img" width={400} height={300} />);
    fireEvent.load(getImg('Img'));
    expect(container.querySelector('.animate-pulse')).not.toBeInTheDocument();
  });

  it('hides img with opacity-0 while skeleton is shown', () => {
    render(<Image src="/img.jpg" alt="Img" width={400} height={300} />);
    expect(getImg('Img')).toHaveClass('opacity-0');
  });

  it('reveals img with opacity-100 after load', () => {
    render(<Image src="/img.jpg" alt="Img" width={400} height={300} />);
    fireEvent.load(getImg('Img'));
    expect(getImg('Img')).toHaveClass('opacity-100');
  });

  it('reveals img with opacity-100 on error (shows broken-image indicator)', () => {
    render(<Image src="/img.jpg" alt="Img" width={400} height={300} />);
    fireEvent.error(getImg('Img'));
    expect(getImg('Img')).toHaveClass('opacity-100');
  });
});

// ─── Blur-up progressive loading ─────────────────────────────────────────────

describe('Image — blur-up', () => {
  it('renders a blurred placeholder img when progressive + placeholder', () => {
    const { container } = render(
      <Image
        src="/high-res.jpg"
        alt="Img"
        placeholder="/tiny.jpg"
        progressive
        width={400}
        height={300}
      />,
    );
    const placeholder = container.querySelector<HTMLImageElement>('img[aria-hidden]');
    expect(placeholder).toBeInTheDocument();
    expect(placeholder).toHaveAttribute('src', '/tiny.jpg');
  });

  it('does NOT render a placeholder when progressive is false', () => {
    const { container } = render(
      <Image src="/img.jpg" alt="Img" placeholder="/tiny.jpg" width={400} height={300} />,
    );
    expect(container.querySelector('img[aria-hidden]')).not.toBeInTheDocument();
  });

  it('placeholder is visible before load (opacity 1)', () => {
    const { container } = render(
      <Image
        src="/img.jpg"
        alt="Img"
        placeholder="/tiny.jpg"
        progressive
        width={400}
        height={300}
      />,
    );
    const placeholder = container.querySelector<HTMLElement>('img[aria-hidden]')!;
    expect(placeholder).toHaveStyle('opacity: 1');
  });

  it('main img starts transparent (opacity-0)', () => {
    render(
      <Image
        src="/img.jpg"
        alt="Img"
        placeholder="/tiny.jpg"
        progressive
        width={400}
        height={300}
      />,
    );
    expect(getImg('Img')).toHaveClass('opacity-0');
  });

  it('placeholder fades out and main img fades in after load', () => {
    const { container } = render(
      <Image
        src="/img.jpg"
        alt="Img"
        placeholder="/tiny.jpg"
        progressive
        width={400}
        height={300}
      />,
    );
    fireEvent.load(getImg('Img'));
    const placeholder = container.querySelector<HTMLElement>('img[aria-hidden]')!;
    expect(placeholder).toHaveStyle('opacity: 0');
    expect(getImg('Img')).toHaveClass('opacity-100');
  });

  it('placeholder fades out on error too (shows broken-image indicator)', () => {
    const { container } = render(
      <Image
        src="/img.jpg"
        alt="Img"
        placeholder="/tiny.jpg"
        progressive
        width={400}
        height={300}
      />,
    );
    fireEvent.error(getImg('Img'));
    const placeholder = container.querySelector<HTMLElement>('img[aria-hidden]')!;
    expect(placeholder).toHaveStyle('opacity: 0');
  });

  it('does NOT show skeleton when blur-up is active', () => {
    const { container } = render(
      <Image
        src="/img.jpg"
        alt="Img"
        placeholder="/tiny.jpg"
        progressive
        width={400}
        height={300}
      />,
    );
    expect(container.querySelector('.animate-pulse')).not.toBeInTheDocument();
  });

  it('applies transition-opacity class for GPU-composited fade', () => {
    render(
      <Image
        src="/img.jpg"
        alt="Img"
        placeholder="/tiny.jpg"
        progressive
        width={400}
        height={300}
      />,
    );
    expect(getImg('Img')).toHaveClass('transition-opacity');
  });
});

// ─── Src change ──────────────────────────────────────────────────────────────

describe('Image — src change', () => {
  it('resets loaded state when src prop changes', () => {
    const { rerender } = render(<Image src="/img1.jpg" alt="Img" width={400} height={300} />);
    fireEvent.load(getImg('Img'));
    expect(getImg('Img')).toHaveClass('opacity-100');

    rerender(<Image src="/img2.jpg" alt="Img" width={400} height={300} />);
    expect(getImg('Img')).toHaveClass('opacity-0');
    expect(getImg('Img')).toHaveAttribute('src', '/img2.jpg');
  });
});
