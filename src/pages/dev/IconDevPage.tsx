import * as Iconsax from 'iconsax-react';
import * as LucideIcons from 'lucide-react';
import { useMemo, useState } from 'react';

import { DevBreadcrumb } from '@/pages/dev/_DevBreadcrumb';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { cn } from '@/shared/lib/utils';

import type { IconProps as IcosaIconProps } from 'iconsax-react';

// ─── Constants ───────────────────────────────────────────────────────────────

const VUESAX_VARIANTS = ['Linear', 'Outline', 'Broken', 'Bold', 'Bulk', 'TwoTone'] as const;
type VuesaxVariant = (typeof VUESAX_VARIANTS)[number];

const FILE_ICONS = [
  'aep',
  'ai',
  'audio',
  'avi',
  'code',
  'css',
  'csv',
  'dmg',
  'doc',
  'document',
  'docx',
  'empty',
  'eps',
  'exe',
  'fig',
  'folder',
  'gif',
  'html',
  'image',
  'img',
  'indd',
  'java',
  'jpeg',
  'jpg',
  'js',
  'json',
  'mkv',
  'mp3',
  'mp4',
  'mpeg',
  'pdf',
  'pdf-plain',
  'png',
  'ppt',
  'pptx',
  'psd',
  'rar',
  'rss',
  'spreadsheet',
  'sql',
  'svg',
  'tiff',
  'txt',
  'video-01',
  'video-02',
  'wav',
  'webp',
  'xls',
  'xlsx',
  'xml',
  'zip',
];
const FILE_VARIANTS = ['default', 'gray', 'solid'] as const;
type FileVariant = (typeof FILE_VARIANTS)[number];

const LOGO_SIZES = ['sm', 'md', 'lg', 'xl'] as const;
const LOGO_TYPES = [
  'brand-dark',
  'brand-light',
  'error-dark',
  'error-light',
  'gray-dark',
  'gray-light',
  'gray-modern',
  'success-dark',
  'success-light',
  'warning-dark',
  'warning-light',
] as const;

// ─── Icon data ────────────────────────────────────────────────────────────────

const isReactComponent = (name: string, v: unknown): boolean =>
  /^[A-Z]/.test(name) &&
  (typeof v === 'function' || (typeof v === 'object' && v !== null && '$$typeof' in (v as object)));

const ICONSAX_ENTRIES = Object.entries(Iconsax).filter(([name, v]) =>
  isReactComponent(name, v),
) as [string, React.ComponentType<IcosaIconProps>][];

// Deduplicate: remove *Icon aliases (ActivityIcon → Activity) and LucideProvider
const LUCIDE_ENTRIES = Object.entries(LucideIcons).filter(
  ([name, v]) => !name.endsWith('Icon') && name !== 'LucideProvider' && isReactComponent(name, v),
) as [string, React.ComponentType<{ size?: number; className?: string }>][];

// ─── Shared helpers ───────────────────────────────────────────────────────────

function useCopied() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = (text: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(text);
    setTimeout(() => setCopied(null), 1400);
  };
  return { copied, copy };
}

function SearchInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Tìm icon..."
      className="w-full max-w-xs rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary-300"
    />
  );
}

function VariantBar<T extends string>({
  options,
  value,
  onChange,
}: {
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={cn(
            'rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors',
            value === opt
              ? 'border-primary-600 bg-primary-50 text-primary-600'
              : 'border-border bg-background text-muted-foreground hover:border-primary-300 hover:bg-neutral-50',
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function IconCard({
  name,
  isCopied,
  onCopy,
  children,
}: {
  name: string;
  isCopied: boolean;
  onCopy: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onCopy}
      title={`Click để copy: ${name}`}
      className={cn(
        'flex flex-col items-center gap-2 rounded-lg border px-2 py-3 text-center transition-colors',
        isCopied
          ? 'border-success-500 bg-success-50'
          : 'border-border bg-background hover:border-primary-300 hover:bg-primary-50',
      )}
    >
      {children}
      <span className="w-full truncate text-[11px] leading-tight text-muted-foreground">
        {isCopied ? '✓ Copied' : name}
      </span>
    </button>
  );
}

// ─── Vuesax section ───────────────────────────────────────────────────────────

function VuesaxSection() {
  const [variant, setVariant] = useState<VuesaxVariant>('Linear');
  const [search, setSearch] = useState('');
  const { copied, copy } = useCopied();

  const filtered = useMemo(
    () =>
      search
        ? ICONSAX_ENTRIES.filter(([name]) => name.toLowerCase().includes(search.toLowerCase()))
        : ICONSAX_ENTRIES,
    [search],
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <SearchInput value={search} onChange={setSearch} />
        <span className="text-body-2-rg text-muted-foreground">
          {filtered.length} / {ICONSAX_ENTRIES.length} icons
        </span>
      </div>

      <VariantBar options={VUESAX_VARIANTS} value={variant} onChange={setVariant} />

      <div className="grid grid-cols-[repeat(auto-fill,minmax(84px,1fr))] gap-2">
        {filtered.map(([name, IconComponent]) => (
          <IconCard key={name} name={name} isCopied={copied === name} onCopy={() => copy(name)}>
            <IconComponent size={24} variant={variant} />
          </IconCard>
        ))}
      </div>
    </div>
  );
}

// ─── Lucide section ───────────────────────────────────────────────────────────

const LUCIDE_PAGE_SIZE = 200;

function LucideSection() {
  const [search, setSearch] = useState('');
  const { copied, copy } = useCopied();

  const filtered = useMemo(
    () =>
      search.trim()
        ? LUCIDE_ENTRIES.filter(([name]) => name.toLowerCase().includes(search.toLowerCase()))
        : LUCIDE_ENTRIES,
    [search],
  );

  const visible = search.trim() ? filtered : filtered.slice(0, LUCIDE_PAGE_SIZE);
  const hasMore = !search.trim() && filtered.length > LUCIDE_PAGE_SIZE;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <SearchInput value={search} onChange={setSearch} />
        <span className="text-body-2-rg text-muted-foreground">
          {search.trim() ? `${filtered.length}` : `${LUCIDE_PAGE_SIZE}+`} / {LUCIDE_ENTRIES.length}{' '}
          icons
        </span>
      </div>

      {hasMore && (
        <p className="text-body-2-rg text-muted-foreground">
          Hiển thị {LUCIDE_PAGE_SIZE} / {LUCIDE_ENTRIES.length} — nhập tên để tìm chính xác.
        </p>
      )}

      <div className="grid grid-cols-[repeat(auto-fill,minmax(84px,1fr))] gap-2">
        {visible.map(([name, IconComponent]) => (
          <IconCard key={name} name={name} isCopied={copied === name} onCopy={() => copy(name)}>
            <IconComponent size={24} />
          </IconCard>
        ))}
      </div>
    </div>
  );
}

// ─── Misc section ─────────────────────────────────────────────────────────────

function MiscFileSection() {
  const [variant, setVariant] = useState<FileVariant>('default');
  const [search, setSearch] = useState('');
  const { copied, copy } = useCopied();

  const filtered = useMemo(
    () =>
      search
        ? FILE_ICONS.filter((name) => name.toLowerCase().includes(search.toLowerCase()))
        : FILE_ICONS,
    [search],
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <SearchInput value={search} onChange={setSearch} />
        <span className="text-body-2-rg text-muted-foreground">
          {filtered.length} / {FILE_ICONS.length} icons
        </span>
      </div>

      <VariantBar options={FILE_VARIANTS} value={variant} onChange={setVariant} />

      <div className="grid grid-cols-[repeat(auto-fill,minmax(84px,1fr))] gap-2">
        {filtered.map((name) => {
          const src = `/misc-icons/${name}-${variant}.svg`;
          return (
            <IconCard key={name} name={name} isCopied={copied === src} onCopy={() => copy(src)}>
              <img src={src} alt={name} className="h-10 w-10 object-contain" />
            </IconCard>
          );
        })}
      </div>
    </div>
  );
}

function MiscLogoSection() {
  const { copied, copy } = useCopied();

  return (
    <div className="space-y-4">
      <p className="text-body-2-rg text-muted-foreground">
        {LOGO_SIZES.length * LOGO_TYPES.length} icons — click để copy đường dẫn
      </p>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="border border-border bg-neutral-50 px-3 py-2 text-left text-xs font-semibold text-muted-foreground">
                Size
              </th>
              {LOGO_TYPES.map((type) => (
                <th
                  key={type}
                  className="whitespace-nowrap border border-border bg-neutral-50 px-3 py-2 text-center text-xs font-semibold text-muted-foreground"
                >
                  {type}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {LOGO_SIZES.map((size) => (
              <tr key={size}>
                <td className="border border-border bg-neutral-50 px-3 py-2 text-center text-xs font-bold text-muted-foreground">
                  {size}
                </td>
                {LOGO_TYPES.map((type) => {
                  const name = `${size}-${type}`;
                  const src = `/misc-icons/${name}.svg`;
                  const isCopied = copied === src;
                  return (
                    <td key={type} className="border border-border p-2">
                      <button
                        onClick={() => copy(src)}
                        title={`Copy: ${src}`}
                        className={cn(
                          'flex w-full flex-col items-center gap-1 rounded-lg p-2 transition-colors',
                          isCopied ? 'bg-success-50' : 'hover:bg-primary-50',
                        )}
                      >
                        <img src={src} alt={name} className="h-10 w-10 object-contain" />
                        <span className="text-[10px] text-muted-foreground">
                          {isCopied ? '✓' : name}
                        </span>
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MiscSection() {
  return (
    <Tabs defaultValue="file">
      <TabsList variant="underline">
        <TabsTrigger variant="underline" value="file">
          File Type ({FILE_ICONS.length} types × 3 variants)
        </TabsTrigger>
        <TabsTrigger variant="underline" value="logo">
          Logo / Status ({LOGO_SIZES.length * LOGO_TYPES.length} icons)
        </TabsTrigger>
      </TabsList>

      <TabsContent value="file" className="mt-4">
        <MiscFileSection />
      </TabsContent>
      <TabsContent value="logo" className="mt-4">
        <MiscLogoSection />
      </TabsContent>
    </Tabs>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export const IconDevPage = () => (
  <div className="min-h-screen w-full space-y-6 bg-background p-6">
    <DevBreadcrumb label="Icon" />

    <div>
      <h1 className="text-heading-3 text-foreground">Icons</h1>
      <p className="mt-1 text-body-2-rg text-muted-foreground">
        Vuesax (iconsax-react) · Lucide · Misc SVG — click icon để copy tên hoặc đường dẫn.
      </p>
    </div>

    <Tabs defaultValue="vuesax">
      <TabsList variant="underline">
        <TabsTrigger variant="underline" value="vuesax">
          Vuesax ({ICONSAX_ENTRIES.length})
        </TabsTrigger>
        <TabsTrigger variant="underline" value="lucide">
          Lucide ({LUCIDE_ENTRIES.length})
        </TabsTrigger>
        <TabsTrigger variant="underline" value="misc">
          Misc
        </TabsTrigger>
      </TabsList>

      <TabsContent value="vuesax" className="mt-6">
        <VuesaxSection />
      </TabsContent>
      <TabsContent value="lucide" className="mt-6">
        <LucideSection />
      </TabsContent>
      <TabsContent value="misc" className="mt-6">
        <MiscSection />
      </TabsContent>
    </Tabs>
  </div>
);
