import { Image } from './index';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Image> = {
  title: 'UI/Image',
  component: Image,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Image>;

// ---------------------------------------------------------------------------
// 1. WebP / AVIF format fallback
// The browser picks the first <source> it supports: AVIF → WebP → JPEG.
// ---------------------------------------------------------------------------
export const ModernFormatFallback: Story = {
  render: () => (
    <Image
      src="/image.jpg"
      webpSrc="/image.webp"
      avifSrc="/image.avif"
      alt="Modern format fallback"
      width={400}
      height={300}
      fallbackSrc="https://placehold.co/400x300/e2e8f0/94a3b8?text=Image"
    />
  ),
};

// ---------------------------------------------------------------------------
// 2. Responsive / art-direction sources
// Different images (or formats) served based on viewport media queries.
// ---------------------------------------------------------------------------
export const ResponsiveSources: Story = {
  render: () => (
    <Image
      src="/desktop.jpg"
      sources={[
        { media: '(max-width: 768px)', srcSet: '/mobile.avif', type: 'image/avif' },
        { media: '(min-width: 769px)', srcSet: '/desktop.avif', type: 'image/avif' },
      ]}
      alt="Art-direction responsive image"
      width={600}
      height={400}
      fallbackSrc="https://placehold.co/600x400/e2e8f0/94a3b8?text=Responsive"
    />
  ),
};

// ---------------------------------------------------------------------------
// 3. Blur-up progressive loading (LQIP)
// The tiny placeholder blurs up to fill the space; the full image fades in.
// ---------------------------------------------------------------------------
export const BlurUpProgressive: Story = {
  render: () => (
    <Image
      src="https://placehold.co/800x600/3b82f6/ffffff?text=Full+Image"
      placeholder="https://placehold.co/40x30/93c5fd/ffffff?text=."
      progressive
      alt="Blur-up progressive image"
      width={800}
      height={600}
      placeholderDuration={600}
    />
  ),
};

// ---------------------------------------------------------------------------
// 4. Skeleton loading state
// Shown while the image loads when width + height are both provided.
// ---------------------------------------------------------------------------
export const SkeletonLoading: Story = {
  render: () => (
    <Image
      src="https://placehold.co/400x300/6366f1/ffffff?text=Loaded"
      alt="Image with skeleton"
      width={400}
      height={300}
    />
  ),
};

// ---------------------------------------------------------------------------
// 5. Priority / LCP hero image
// Sets loading=eager, fetchpriority=high, decoding=async, and injects a
// <link rel="preload"> into <head> so the browser fetches it immediately.
// ---------------------------------------------------------------------------
export const HeroPriority: Story = {
  render: () => (
    <Image
      src="https://placehold.co/1200x400/0f172a/f8fafc?text=Hero+LCP+Image"
      avifSrc="/hero.avif"
      alt="Hero LCP image"
      priority
      width={1200}
      height={400}
      className="w-full"
    />
  ),
};

// ---------------------------------------------------------------------------
// 6. Fallback on error
// Loads /nonexistent.jpg first; on failure switches to fallbackSrc silently.
// ---------------------------------------------------------------------------
export const FallbackOnError: Story = {
  render: () => (
    <Image
      src="/nonexistent.jpg"
      fallbackSrc="https://placehold.co/400x300/fef2f2/ef4444?text=Fallback"
      alt="Image with fallback"
      width={400}
      height={300}
    />
  ),
};

// ---------------------------------------------------------------------------
// 7. Variant showcase
// ---------------------------------------------------------------------------
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-6 p-6">
      {(['default', 'product', 'thumbnail', 'hero', 'avatar'] as const).map((variant) => (
        <div key={variant} className="flex flex-col items-center gap-2">
          <Image
            src="https://placehold.co/200x200/e2e8f0/64748b?text=img"
            alt={variant}
            variant={variant}
            width={200}
            height={200}
          />
          <span className="text-body-3-rg text-neutral-600">{variant}</span>
        </div>
      ))}
    </div>
  ),
};

// ---------------------------------------------------------------------------
// 8. Full API — combines all options a developer might reach for
// ---------------------------------------------------------------------------
export const ComplexAPI: Story = {
  render: () => (
    <Image
      src="/product.jpg"
      alt="Product"
      avifSrc="/product.avif"
      webpSrc="/product.webp"
      placeholder="https://placehold.co/20x15/e2e8f0/94a3b8?text=."
      fallbackSrc="https://placehold.co/400x300/f0fdf4/22c55e?text=Fallback"
      variant="product"
      progressive
      priority={false}
      width={400}
      height={300}
      placeholderDuration={400}
    />
  ),
};
