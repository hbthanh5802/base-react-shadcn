import { ChevronDown, Folder, X } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/shared/lib/utils';

import { TreeView } from './index';
import { findNodeById, getNodesByIds, type TreeNode, type TreeSelectProps } from './types';

export const TreeSelect = <T = any,>({
  data,
  value: controlledValue,
  defaultValue,
  onChange,
  placeholder = 'Chọn mục phân cấp...',
  disabled = false,
  allowClear = true,
  multiple = false,
  searchable = true,
  searchPlaceholder = 'Tìm kiếm...',
  className,
  popoverClassName,
  loadData,
  showLines = true,
  ...treeProps
}: TreeSelectProps<T>) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const initialSelected = React.useMemo(() => {
    if (defaultValue) {
      return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
    }
    return [];
  }, [defaultValue]);

  const [internalValue, setInternalValue] = React.useState<string[]>(initialSelected);
  const selectedKeys = React.useMemo(() => {
    if (controlledValue !== undefined) {
      return Array.isArray(controlledValue) ? controlledValue : controlledValue ? [controlledValue] : [];
    }
    return internalValue;
  }, [controlledValue, internalValue]);

  // Click outside to close
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const selectedNodes = React.useMemo(() => {
    return getNodesByIds(data, selectedKeys);
  }, [data, selectedKeys]);

  const handleSelectionChange = (newKeys: string[], nodes: TreeNode<T>[]) => {
    if (controlledValue === undefined) {
      setInternalValue(newKeys);
    }

    if (multiple) {
      onChange?.(newKeys, nodes);
    } else {
      const singleKey = newKeys[0] ?? '';
      onChange?.(singleKey, nodes);
      setIsOpen(false);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (controlledValue === undefined) {
      setInternalValue([]);
    }
    onChange?.(multiple ? [] : '', []);
  };

  const handleRemoveTag = (key: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newKeys = selectedKeys.filter((k) => k !== key);
    if (controlledValue === undefined) {
      setInternalValue(newKeys);
    }
    const nodes = getNodesByIds(data, newKeys);
    onChange?.(multiple ? newKeys : '', nodes);
  };

  return (
    <div ref={containerRef} className={cn('relative w-full', className)}>
      {/* Trigger Box */}
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={cn(
          'flex min-h-10 w-full items-center justify-between gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-body-2-rg shadow-2xs transition-all select-none cursor-pointer',
          isOpen && 'border-primary ring-2 ring-primary/20',
          disabled && 'cursor-not-allowed opacity-50 bg-muted',
        )}
      >
        <div className="flex flex-1 flex-wrap items-center gap-1.5 overflow-hidden">
          {selectedNodes.length === 0 ? (
            <span className="text-muted-foreground">{placeholder}</span>
          ) : multiple ? (
            selectedNodes.map((node) => (
              <span
                key={node.id}
                className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 text-caption-1-sb text-foreground"
              >
                <span>{typeof node.label === 'string' ? node.label : node.id}</span>
                {!disabled && (
                  <button
                    type="button"
                    onClick={(e) => handleRemoveTag(node.id, e)}
                    className="text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    <X size={12} />
                  </button>
                )}
              </span>
            ))
          ) : (
            <span className="truncate font-medium text-foreground">
              {typeof selectedNodes[0]?.label === 'string'
                ? selectedNodes[0].label
                : selectedNodes[0]?.id}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 shrink-0 text-muted-foreground">
          {allowClear && selectedKeys.length > 0 && !disabled && (
            <button
              type="button"
              aria-label="Xóa lựa chọn"
              onClick={handleClear}
              className="p-1 hover:text-foreground cursor-pointer transition-colors"
            >
              <X size={14} />
            </button>
          )}
          <ChevronDown
            size={16}
            className={cn('transition-transform duration-200', isOpen && 'rotate-180 text-primary')}
          />
        </div>
      </div>

      {/* Popover Dropdown */}
      {isOpen && (
        <div
          className={cn(
            'absolute z-50 mt-1.5 max-h-[380px] w-full min-w-[280px] overflow-hidden rounded-xl border border-border bg-card p-1.5 shadow-xl animate-in fade-in-0 zoom-in-95',
            popoverClassName,
          )}
        >
          <TreeView
            data={data}
            selectionMode={multiple ? 'checkbox' : 'single'}
            selectedKeys={selectedKeys}
            onSelectionChange={handleSelectionChange}
            searchable={searchable}
            searchPlaceholder={searchPlaceholder}
            loadData={loadData}
            showLines={showLines}
            className="border-none p-1 shadow-none"
            {...treeProps}
          />
        </div>
      )}
    </div>
  );
};

export default TreeSelect;
