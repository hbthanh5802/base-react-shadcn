import { useEffect, useState } from 'react';

import type { LoadState } from '@/shared/components/ui/document-viewer/types';

type Result =
  | { src: string | undefined; file: File | undefined; data: ArrayBuffer }
  | { src: string | undefined; file: File | undefined; error: Error };

export function useDocumentLoader(src?: string, file?: File): LoadState {
  const [result, setResult] = useState<Result | null>(null);

  useEffect(() => {
    if (!src && !file) return;

    const controller = new AbortController();

    const load = async () => {
      try {
        const data = file
          ? await file.arrayBuffer()
          : await fetch(src!, { signal: controller.signal }).then((r) => {
              if (!r.ok) throw new Error(`HTTP ${r.status}: ${r.statusText}`);
              return r.arrayBuffer();
            });
        setResult({ src, file, data });
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') return;
        setResult({ src, file, error: err instanceof Error ? err : new Error(String(err)) });
      }
    };

    load();
    return () => controller.abort();
  }, [src, file]);

  // Derive state — no synchronous setState needed
  if (!src && !file) return { status: 'idle' };

  const isMatch = result?.src === src && result?.file === file;
  if (!isMatch) return { status: 'loading' };

  if ('error' in result!) return { status: 'error', error: result!.error };
  return { status: 'loaded', data: result!.data };
}
