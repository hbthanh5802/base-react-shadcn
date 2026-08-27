import { X } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/shared/lib/utils';

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function TagInput({
  value,
  onChange,
  placeholder = 'Nhập và nhấn Enter...',
  className,
  disabled,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState('');

  const addTag = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
    }
    setInputValue('');
  };

  const removeTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
    if (e.key === 'Backspace' && !inputValue && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  return (
    <div
      className={cn(
        'flex min-h-12 w-full flex-wrap items-center gap-1.5 rounded-lg border border-input bg-background px-4 py-1.5 transition-shadow focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20',
        disabled && 'cursor-not-allowed border-border bg-muted/50 opacity-60',
        className,
      )}
    >
      {value.map((tag) => (
        <span
          key={tag}
          className="flex items-center gap-1.5 rounded bg-muted px-2 py-0.5 text-body-2-rg text-foreground border border-border"
        >
          {tag}
          {!disabled && (
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="text-muted-foreground hover:text-foreground focus:outline-none"
              aria-label={`Xóa ${tag}`}
            >
              <X size={14} />
            </button>
          )}
        </span>
      ))}
      {!disabled && (
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={addTag}
          placeholder={value.length === 0 ? placeholder : ''}
          className="min-w-[120px] flex-1 border-none bg-transparent p-0 text-body-1-rg text-foreground outline-none placeholder:text-muted-foreground focus:ring-0"
        />
      )}
    </div>
  );
}
