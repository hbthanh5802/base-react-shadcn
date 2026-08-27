import { renderAsync } from 'docx-preview';
import { type RefObject, useEffect, useState } from 'react';

import type { LoadState } from '@/shared/components/ui/document-viewer/types';

export type DocxRenderStatus = 'pending' | 'ok' | 'format-error' | 'error';

const FORMAT_ERROR_PATTERNS = ['zip', 'End of central directory', 'not a valid', 'PK'];

function isFormatError(err: unknown): boolean {
  const msg = err instanceof Error ? err.message : String(err);
  return FORMAT_ERROR_PATTERNS.some((p) => msg.includes(p));
}

type RenderResult = {
  data: ArrayBuffer;
  status: 'ok' | 'format-error' | 'error';
};

export function useDocxRender(
  loadState: LoadState,
  containerRef: RefObject<HTMLDivElement | null>,
): DocxRenderStatus {
  const [renderResult, setRenderResult] = useState<RenderResult | null>(null);

  // Extract the stable ArrayBuffer reference — avoids re-running the effect on every render
  // since loadState is a new object reference each render even when data hasn't changed
  const data = loadState.status === 'loaded' ? loadState.data : null;

  useEffect(() => {
    if (!data || !containerRef.current) return;

    containerRef.current.innerHTML = '';

    renderAsync(data, containerRef.current, undefined, {
      inWrapper: false,
      ignoreWidth: true,
      ignoreHeight: true,
      breakPages: true,
      useBase64URL: true,
    })
      .then(() => setRenderResult({ data, status: 'ok' }))
      .catch((err) =>
        setRenderResult({ data, status: isFormatError(err) ? 'format-error' : 'error' }),
      );
  }, [data, containerRef]);

  // Derive status — no synchronous setState needed
  if (!data) return 'pending';
  if (renderResult?.data !== data) return 'pending';
  return renderResult.status;
}
