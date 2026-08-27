import { Check, ChevronDown, ChevronUp, Copy } from 'lucide-react';
import * as React from 'react';
import { toast } from 'sonner';

import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';

// ─── Simple syntax highlighter for TSX/JS/HTML/CSS ───────────────────────────

function highlightCode(code: string, language: string): React.ReactNode[] {
  if (!code) return [];

  // Simple token regex matching keywords, tags, props, strings, comments, numbers
  const lines = code.split('\n');

  return lines.map((line, lineIdx) => {
    // Check if line is a comment
    const trimmed = line.trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('/*')) {
      return (
        <div key={lineIdx} className="table-row">
          <span className="table-cell select-none pr-4 text-right text-muted-foreground/40 text-xs">
            {lineIdx + 1}
          </span>
          <span className="table-cell text-muted-foreground/70 italic">{line}</span>
        </div>
      );
    }

    // Process tokens in line
    const tokenRegex =
      /(".*?"|'.*?'|`.*?`|\b(?:import|export|from|const|let|var|function|return|interface|type|default|async|await|if|else|switch|case|break|true|false|null|undefined)\b|<\/?[A-Z][A-Za-z0-9_]*|\b[a-z0-9_-]+(?==)|[{}[\]()<>])/g;

    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = tokenRegex.exec(line)) !== null) {
      const matchStart = match.index;
      const matchText = match[0];

      // Add pre-match plain text
      if (matchStart > lastIndex) {
        parts.push(line.slice(lastIndex, matchStart));
      }

      // Format token
      if (matchText.startsWith('"') || matchText.startsWith("'") || matchText.startsWith('`')) {
        // String
        parts.push(
          <span key={matchStart} className="text-emerald-600 dark:text-emerald-400">
            {matchText}
          </span>,
        );
      } else if (
        /^(import|export|from|const|let|var|function|return|interface|type|default|async|await|if|else|switch|case|break)$/.test(
          matchText,
        )
      ) {
        // Keyword
        parts.push(
          <span key={matchStart} className="font-medium text-purple-600 dark:text-purple-400">
            {matchText}
          </span>,
        );
      } else if (/^(true|false|null|undefined)$/.test(matchText)) {
        // Literal
        parts.push(
          <span key={matchStart} className="text-amber-600 dark:text-amber-400">
            {matchText}
          </span>,
        );
      } else if (matchText.startsWith('<') || matchText.startsWith('</')) {
        // Component Tag
        parts.push(
          <span key={matchStart} className="font-semibold text-blue-600 dark:text-blue-400">
            {matchText}
          </span>,
        );
      } else if (line[matchStart + matchText.length] === '=') {
        // Prop name
        parts.push(
          <span key={matchStart} className="text-cyan-600 dark:text-cyan-400">
            {matchText}
          </span>,
        );
      } else {
        parts.push(matchText);
      }

      lastIndex = tokenRegex.lastIndex;
    }

    if (lastIndex < line.length) {
      parts.push(line.slice(lastIndex));
    }

    return (
      <div key={lineIdx} className="table-row">
        <span className="table-cell select-none pr-4 text-right text-muted-foreground/40 text-xs">
          {lineIdx + 1}
        </span>
        <span className="table-cell">{parts.length > 0 ? parts : ' '}</span>
      </div>
    );
  });
}

// ─── CodeBlock Component ──────────────────────────────────────────────────────

export interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
  collapsible?: boolean;
  defaultExpanded?: boolean;
  maxHeight?: string;
}

export function CodeBlock({
  code,
  language = 'tsx',
  title,
  showLineNumbers = true,
  collapsible = false,
  defaultExpanded = true,
  maxHeight = '400px',
  className,
  ...props
}: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);
  const [expanded, setExpanded] = React.useState(defaultExpanded);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success('Đã sao chép mã nguồn vào clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Không thể sao chép mã nguồn');
    }
  };

  return (
    <div
      className={cn(
        'CodeBlock group relative overflow-hidden rounded-xl border border-border bg-muted/40 font-mono text-sm shadow-xs transition-all dark:bg-muted/20',
        className,
      )}
      {...props}
    >
      {/* Header bar */}
      <div className="flex h-10 items-center justify-between border-b border-border/80 bg-muted/70 px-4 dark:bg-muted/40">
        <div className="flex items-center gap-2">
          {/* macOS window dots */}
          <div className="flex items-center gap-1.5 opacity-70">
            <div className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
            <div className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          </div>
          {title ? (
            <span className="ml-2 font-sans text-body-3-sb text-foreground">{title}</span>
          ) : (
            <span className="ml-2 uppercase tracking-wider text-[11px] font-semibold text-muted-foreground">
              {language}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          {collapsible && (
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 rounded-md px-2 py-1 font-sans text-xs text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              {expanded ? (
                <>
                  <ChevronUp className="h-3.5 w-3.5" />
                  <span>Thu gọn</span>
                </>
              ) : (
                <>
                  <ChevronDown className="h-3.5 w-3.5" />
                  <span>Mở rộng</span>
                </>
              )}
            </button>
          )}

          <button
            type="button"
            onClick={handleCopy}
            aria-label="Sao chép code"
            className="flex items-center gap-1.5 rounded-lg border border-border/60 bg-background/80 px-2.5 py-1 font-sans text-xs font-medium text-foreground shadow-xs transition-all hover:bg-background hover:text-primary active:scale-95"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-primary" />
                <span className="text-primary">Đã chép</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                <span>Sao chép</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code content */}
      {expanded && (
        <div
          className="scrollbar-thin overflow-x-auto p-4 text-xs leading-relaxed"
          style={{ maxHeight }}
        >
          <pre className="table w-full">
            <code>{highlightCode(code, language)}</code>
          </pre>
        </div>
      )}
    </div>
  );
}

// ─── CodePreview (Interactive Demo + Code Showcase) ───────────────────────────

export interface CodePreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string;
  title?: string;
  description?: string;
  language?: string;
  defaultShowCode?: boolean;
  children: React.ReactNode;
}

export function CodePreview({
  code,
  title,
  description,
  language = 'tsx',
  defaultShowCode = false,
  children,
  className,
  ...props
}: CodePreviewProps) {
  const [showCode, setShowCode] = React.useState(defaultShowCode);
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success('Đã sao chép mã nguồn vào clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Không thể sao chép');
    }
  };

  return (
    <div
      className={cn(
        'CodePreview space-y-3 rounded-xl border border-border bg-card p-6 shadow-xs',
        className,
      )}
      {...props}
    >
      {/* Title & Description Header if provided */}
      {(title || description) && (
        <div className="flex flex-col gap-1 border-b border-border pb-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {title && <h2 className="text-title-1 font-semibold text-foreground">{title}</h2>}
            {description && (
              <p className="text-body-2-rg text-muted-foreground mt-0.5">{description}</p>
            )}
          </div>
          <div className="flex items-center gap-2 pt-2 sm:pt-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCode(!showCode)}
              className="text-xs"
            >
              {showCode ? (
                <>
                  <ChevronUp className="mr-1 h-3.5 w-3.5" />
                  Ẩn code
                </>
              ) : (
                <>
                  <ChevronDown className="mr-1 h-3.5 w-3.5" />
                  Xem code
                </>
              )}
            </Button>
            <Button variant="outline" size="sm" onClick={handleCopy} className="text-xs">
              {copied ? (
                <>
                  <Check className="mr-1 h-3.5 w-3.5 text-primary" />
                  <span className="text-primary">Đã chép</span>
                </>
              ) : (
                <>
                  <Copy className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
                  Sao chép
                </>
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Preview area */}
      <div className="rounded-lg border border-border/60 bg-muted/20 p-6 dark:bg-muted/10">
        {children}
      </div>

      {/* Code Toggle Area if no header or if expanded */}
      {!title && !description && (
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowCode(!showCode)}
            className="text-xs"
          >
            {showCode ? (
              <>
                <ChevronUp className="mr-1 h-3.5 w-3.5" />
                Ẩn code
              </>
            ) : (
              <>
                <ChevronDown className="mr-1 h-3.5 w-3.5" />
                Xem code
              </>
            )}
          </Button>
          <Button variant="outline" size="sm" onClick={handleCopy} className="text-xs">
            {copied ? (
              <>
                <Check className="mr-1 h-3.5 w-3.5 text-primary" />
                <span className="text-primary">Đã chép</span>
              </>
            ) : (
              <>
                <Copy className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
                Sao chép
              </>
            )}
          </Button>
        </div>
      )}

      {/* Expandable Code */}
      {showCode && (
        <CodeBlock code={code} language={language} showLineNumbers collapsible={false} />
      )}
    </div>
  );
}
