import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const customFontSizes = [
  'heading-1',
  'heading-2',
  'heading-3',
  'heading-3-1',
  'title-1',
  'title-1-sb',
  'title-2',
  'title-2-sb',
  'title-2-rg',
  'title-3',
  'title-3-sb',
  'title-3-rg',
  'body-1',
  'body-1-sb',
  'body-1-rg',
  'body-2',
  'body-2-sb',
  'body-2-rg',
  'body-3',
  'body-3-sb',
  'body-3-rg',
];

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: customFontSizes }],
    },
  },
});

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
