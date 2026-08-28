import { ChevronRight, Folder, FolderOpen, Loader2, Search, X } from 'lucide-react';
import * as React from 'react';

import { Checkbox } from '@/shared/components/ui/checkbox';
import { cn } from '@/shared/lib/utils';

import {
  computeNodeCheckboxState,
  filterTreeByKeyword,
  findNodeById,
  getAllNodeKeys,
  getDescendantKeys,
  getNodesByIds,
  getParentKeysToNode,
  handleCheckboxCascadeToggle,
  type TreeNode,
  type TreeSelectionMode,
  type TreeViewProps,
  type TreeViewRef,
  updateNodeChildrenInTree,
} from './types';

// ── TreeView Component ──

export const TreeView = React.forwardRef<TreeViewRef, TreeViewProps<any>>(
  (
    {
      data,
      selectionMode = 'single',
      selectedKeys: controlledSelectedKeys,
      defaultSelectedKeys = [],
      onSelectionChange,
      expandedKeys: controlledExpandedKeys,
      defaultExpandedKeys = [],
      onExpandedChange,
      autoExpandParent = true,
      loadData,
      loadedKeys: controlledLoadedKeys,
      onLoadedChange,
      staleOnCollapse = false,
      showLines = true,
      showIcons = true,
      emptyText = 'Không tìm thấy kết quả phù hợp',
      expandOnClickRow = false,
      className,

      // Header & Search props
      searchable = false,
      searchPlaceholder = 'Tìm kiếm trong cây...',
      searchKeyword: controlledSearchKeyword,
      onSearchKeywordChange,
      showExpandCollapseButtons = true,
      headerExtra,
      renderHeader,

      // Custom Icon & Node renderers
      customExpandIcon,
      customNodeIcon,
      renderNode,
      nodeActions,
    },
    ref,
  ) => {
    // ── State Management ──
    const [internalSelectedKeys, setInternalSelectedKeys] =
      React.useState<string[]>(defaultSelectedKeys);
    const selectedKeys = controlledSelectedKeys ?? internalSelectedKeys;

    const [internalExpandedKeys, setInternalExpandedKeys] =
      React.useState<string[]>(defaultExpandedKeys);
    const expandedKeys = controlledExpandedKeys ?? internalExpandedKeys;

    const [internalLoadedKeys, setInternalLoadedKeys] = React.useState<string[]>([]);
    const loadedKeys = controlledLoadedKeys ?? internalLoadedKeys;

    const [loadingNodeIds, setLoadingNodeIds] = React.useState<Set<string>>(new Set());

    const [internalSearchKeyword, setInternalSearchKeyword] = React.useState('');
    const searchKeyword = controlledSearchKeyword ?? internalSearchKeyword;

    // ── Filter Data based on Search ──
    const { filteredNodes, matchedExpandKeys } = React.useMemo(() => {
      return filterTreeByKeyword(data, searchKeyword);
    }, [data, searchKeyword]);

    const updateSearchKeyword = (val: string) => {
      if (controlledSearchKeyword === undefined) {
        setInternalSearchKeyword(val);
      }
      onSearchKeywordChange?.(val);
    };

    const updateExpandedKeys = (newKeys: string[]) => {
      if (controlledExpandedKeys === undefined) {
        setInternalExpandedKeys(newKeys);
      }
      onExpandedChange?.(newKeys);
    };

    const updateSelectedKeys = (newKeys: string[]) => {
      if (controlledSelectedKeys === undefined) {
        setInternalSelectedKeys(newKeys);
      }
      const selectedNodes = getNodesByIds(data, newKeys);
      onSelectionChange?.(newKeys, selectedNodes);
    };

    const updateLoadedKeys = (newKeys: string[]) => {
      if (controlledLoadedKeys === undefined) {
        setInternalLoadedKeys(newKeys);
      }
      onLoadedChange?.(newKeys);
    };

    // Auto-expand on search
    React.useEffect(() => {
      if (searchKeyword.trim() && matchedExpandKeys.length > 0) {
        const merged = Array.from(new Set([...expandedKeys, ...matchedExpandKeys]));
        updateExpandedKeys(merged);
      }
    }, [searchKeyword, matchedExpandKeys]);

    // Auto-expand parents when selectedKeys change
    React.useEffect(() => {
      if (autoExpandParent && selectedKeys.length > 0) {
        const parentKeySet = new Set<string>();
        for (const key of selectedKeys) {
          const parents = getParentKeysToNode(data, key);
          parents.forEach((p) => parentKeySet.add(p));
        }
        if (parentKeySet.size > 0) {
          const merged = Array.from(new Set([...expandedKeys, ...Array.from(parentKeySet)]));
          if (merged.length !== expandedKeys.length) {
            updateExpandedKeys(merged);
          }
        }
      }
    }, [selectedKeys, autoExpandParent, data]);

    // ── Expand All / Collapse All Helpers ──
    const expandAll = () => {
      const allKeys = getAllNodeKeys(data);
      updateExpandedKeys(allKeys);
    };

    const collapseAll = (options?: { markStale?: boolean }) => {
      updateExpandedKeys([]);
      if (options?.markStale || staleOnCollapse) {
        updateLoadedKeys([]);
      }
    };

    // Tự động mở toàn bộ chuỗi node cha tổ tiên dẫn đến id mục tiêu
    const expandNode = (id: string) => {
      const parentKeys = getParentKeysToNode(data, id);
      const merged = Array.from(new Set([...expandedKeys, ...parentKeys, id]));
      updateExpandedKeys(merged);
    };

    const collapseNode = (
      id: string,
      options?: { includeDescendants?: boolean; markStale?: boolean } | boolean,
    ) => {
      const opts =
        typeof options === 'boolean'
          ? { includeDescendants: options, markStale: staleOnCollapse }
          : { includeDescendants: false, markStale: staleOnCollapse, ...options };

      const targetNode = findNodeById(data, id);
      const isNodeStale = Boolean(opts.markStale || targetNode?.staleOnCollapse);

      if (opts.includeDescendants) {
        const descendantKeys = targetNode ? getDescendantKeys(targetNode) : [id];
        const descendantSet = new Set(descendantKeys);
        updateExpandedKeys(expandedKeys.filter((k) => !descendantSet.has(k)));
        if (isNodeStale) {
          updateLoadedKeys(loadedKeys.filter((k) => !descendantSet.has(k) && k !== id));
        }
      } else {
        updateExpandedKeys(expandedKeys.filter((k) => k !== id));
        if (isNodeStale) {
          updateLoadedKeys(loadedKeys.filter((k) => k !== id));
        }
      }
    };

    const invalidateNode = (id: string) => {
      const targetNode = findNodeById(data, id);
      const descendantKeys = targetNode ? getDescendantKeys(targetNode) : [id];
      const removeSet = new Set([id, ...descendantKeys]);
      updateLoadedKeys(loadedKeys.filter((k) => !removeSet.has(k)));
    };

    const invalidateAll = () => {
      updateLoadedKeys([]);
    };

    // Expose Imperative Methods via ref
    React.useImperativeHandle(
      ref,
      () => ({
        expandAll,
        collapseAll,
        expandNode,
        collapseNode,
        invalidateNode,
        invalidateAll,
        setSearchKeyword: updateSearchKeyword,
      }),
      [data, expandedKeys, loadedKeys],
    );

    // ── Expand / Collapse Toggle Handler (with Async LoadData Support) ──
    const handleToggleExpand = async (node: TreeNode, e?: React.MouseEvent) => {
      e?.stopPropagation();
      const nodeId = node.id;
      const isCurrentlyExpanded = expandedKeys.includes(nodeId);

      if (isCurrentlyExpanded) {
        collapseNode(nodeId);
        return;
      }

      // Mở rộng: Kiểm tra xem có cần loadData không (hoặc khi node bị đánh dấu isStale / chưa load)
      const hasChildren = Boolean(node.children && node.children.length > 0);
      const isNodeStale = Boolean(node.isStale);
      const isAlreadyLoaded = loadedKeys.includes(nodeId) && !isNodeStale;
      const canLoad = !node.isLeaf && (!hasChildren || isNodeStale || !isAlreadyLoaded) && Boolean(loadData);

      if (canLoad && loadData) {
        setLoadingNodeIds((prev) => new Set(prev).add(nodeId));
        try {
          await loadData(node);
          const nextLoaded = Array.from(new Set([...loadedKeys, nodeId]));
          updateLoadedKeys(nextLoaded);
        } catch (err) {
          console.error(`Failed to load children for node ${nodeId}:`, err);
        } finally {
          setLoadingNodeIds((prev) => {
            const next = new Set(prev);
            next.delete(nodeId);
            return next;
          });
        }
      }

      expandNode(nodeId);
    };

    // ── Node Click Handler ──
    const handleNodeClick = (node: TreeNode, e: React.MouseEvent) => {
      if (node.disabled) return;

      if (expandOnClickRow && (!node.isLeaf || node.children?.length)) {
        handleToggleExpand(node, e);
      }

      if (node.selectable === false || selectionMode === 'none') return;

      if (selectionMode === 'single') {
        updateSelectedKeys([node.id]);
      } else if (selectionMode === 'multiple') {
        const isSelected = selectedKeys.includes(node.id);
        const newKeys = isSelected
          ? selectedKeys.filter((id) => id !== node.id)
          : [...selectedKeys, node.id];
        updateSelectedKeys(newKeys);
      } else if (selectionMode === 'checkbox') {
        const selectedSet = new Set(selectedKeys);
        const { isChecked } = computeNodeCheckboxState(node, selectedSet);
        const newKeys = handleCheckboxCascadeToggle(data, selectedKeys, node, !isChecked);
        updateSelectedKeys(newKeys);
      }
    };

    // ── Highlight Search Keyword in Text ──
    const highlightLabel = (label: React.ReactNode, keyword: string) => {
      if (typeof label !== 'string' || !keyword.trim()) return label;
      const parts = label.split(new RegExp(`(${keyword})`, 'gi'));
      return (
        <span>
          {parts.map((part, i) =>
            part.toLowerCase() === keyword.toLowerCase() ? (
              <mark
                key={i}
                className="rounded-xs bg-amber-200/80 dark:bg-amber-500/30 text-foreground px-0.5 font-medium"
              >
                {part}
              </mark>
            ) : (
              part
            ),
          )}
        </span>
      );
    };

    // ── Render Node Recursively ──
    const renderTreeNode = (node: TreeNode, depth = 0, isLastChild = false) => {
      const isExpanded = expandedKeys.includes(node.id);
      const isNodeLoading = loadingNodeIds.has(node.id) || Boolean(node.isLoading);
      const hasChildren = Boolean(node.children && node.children.length > 0);
      const isExpandable = !node.isLeaf && (hasChildren || Boolean(loadData));
      const isLeaf = !isExpandable;
      const selectedSet = new Set(selectedKeys);

      let isSelected = false;
      let isIndeterminate = false;

      if (selectionMode === 'checkbox') {
        const state = computeNodeCheckboxState(node, selectedSet);
        isSelected = state.isChecked;
        isIndeterminate = state.isIndeterminate;
      } else {
        isSelected = selectedKeys.includes(node.id);
      }

      const defaultNodeIcon = () => {
        if (!showIcons) return null;
        if (customNodeIcon) return customNodeIcon(node, { isExpanded, isLeaf });
        if (node.icon) return node.icon;
        if (isExpandable) {
          return isExpanded ? (
            <FolderOpen size={17} className="text-primary-600 dark:text-primary-400 shrink-0" />
          ) : (
            <Folder size={17} className="text-muted-foreground shrink-0" />
          );
        }
        return null;
      };

      const defaultExpandIcon = () => {
        if (customExpandIcon) {
          return customExpandIcon({ isExpanded, isLoading: isNodeLoading, isLeaf });
        }
        if (isNodeLoading) {
          return <Loader2 size={15} className="animate-spin text-primary shrink-0" />;
        }
        if (isExpandable) {
          return (
            <ChevronRight
              size={15}
              className={cn(
                'transition-transform duration-200',
                isExpanded && 'rotate-90 text-foreground',
              )}
            />
          );
        }
        return null;
      };

      return (
        <div key={node.id} className="relative select-none">
          {/* Row Element */}
          <div
            onClick={(e) => handleNodeClick(node, e)}
            className={cn(
              'group relative flex min-h-8 items-center gap-1.5 rounded-lg px-2 py-1 text-body-2-rg transition-all cursor-pointer select-none',
              isSelected && selectionMode !== 'checkbox'
                ? 'bg-primary-50 text-primary-900 font-medium dark:bg-primary-950/60 dark:text-primary-200'
                : 'text-foreground hover:bg-muted/70',
              node.disabled && 'cursor-not-allowed opacity-50',
            )}
            style={{ paddingLeft: `${depth * 20 + 8}px` }}
          >
            {/* Visual Connecting Line Guides */}
            {showLines && depth > 0 && (
              <div
                className={cn(
                  'pointer-events-none absolute left-0 top-0 bottom-0 border-l border-border/70',
                  isLastChild ? 'h-4' : 'h-full',
                )}
                style={{ left: `${(depth - 1) * 20 + 17}px` }}
              />
            )}
            {showLines && depth > 0 && (
              <div
                className="pointer-events-none absolute h-px w-3 border-t border-border/70"
                style={{ left: `${(depth - 1) * 20 + 17}px`, top: '16px' }}
              />
            )}

            {/* Expand / Collapse Arrow / Spinner */}
            <div className="flex h-5 w-5 shrink-0 items-center justify-center">
              {isExpandable ? (
                <button
                  type="button"
                  aria-label={isExpanded ? 'Thu gọn' : 'Mở rộng'}
                  onClick={(e) => handleToggleExpand(node, e)}
                  className="flex h-5 w-5 items-center justify-center rounded-md text-muted-foreground transition-transform hover:bg-muted hover:text-foreground cursor-pointer"
                >
                  {defaultExpandIcon()}
                </button>
              ) : (
                <span className="h-5 w-5" />
              )}
            </div>

            {/* Checkbox (if selectionMode === 'checkbox') */}
            {selectionMode === 'checkbox' && node.selectable !== false && (
              <div
                className="flex items-center justify-center shrink-0 pr-1"
                onClick={(e) => e.stopPropagation()}
              >
                <Checkbox
                  size="medium"
                  checked={isIndeterminate ? 'indeterminate' : isSelected}
                  disabled={node.disabled}
                  onCheckedChange={(checked) => {
                    const targetChecked = checked === true || checked === 'indeterminate';
                    const newKeys = handleCheckboxCascadeToggle(
                      data,
                      selectedKeys,
                      node,
                      targetChecked,
                    );
                    updateSelectedKeys(newKeys);
                  }}
                />
              </div>
            )}

            {/* Node Icon */}
            <div className="flex shrink-0 items-center justify-center">{defaultNodeIcon()}</div>

            {/* Node Content / Custom Renderer */}
            <div className="flex min-w-0 flex-1 items-center gap-2">
              {renderNode ? (
                renderNode(node, {
                  isExpanded,
                  isSelected,
                  isIndeterminate,
                  isLoading: isNodeLoading,
                  depth,
                })
              ) : (
                <span className="truncate text-body-2-rg">
                  {highlightLabel(node.label, searchKeyword)}
                </span>
              )}

              {/* Badge */}
              {node.badge && (
                <span className="shrink-0 text-caption-2-rg rounded-full bg-muted px-2 py-0.5 text-muted-foreground">
                  {node.badge}
                </span>
              )}
            </div>

            {/* Node Hover Actions */}
            {nodeActions && (
              <div
                className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0 flex items-center gap-1"
                onClick={(e) => e.stopPropagation()}
              >
                {nodeActions(node)}
              </div>
            )}
          </div>

          {/* Children Rows */}
          {isExpanded && node.children && node.children.length > 0 && (
            <div className="relative">
              {node.children.map((child, index) =>
                renderTreeNode(child, depth + 1, index === (node.children?.length ?? 0) - 1),
              )}
            </div>
          )}
        </div>
      );
    };

    return (
      <div
        className={cn(
          'flex flex-col gap-2 rounded-xl border border-border bg-card p-3 shadow-xs',
          className,
        )}
      >
        {/* Custom Header (via renderHeader) or Default Search & Toolbar */}
        {renderHeader ? (
          renderHeader({
            searchKeyword,
            setSearchKeyword: updateSearchKeyword,
            expandAll,
            collapseAll,
          })
        ) : searchable ? (
          <div className="relative flex items-center gap-2 pb-1">
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              />
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => updateSearchKeyword(e.target.value)}
                placeholder={searchPlaceholder}
                className="h-9 w-full rounded-lg border border-border bg-background pl-9 pr-8 text-body-2-rg placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              {searchKeyword && (
                <button
                  type="button"
                  aria-label="Xóa từ khóa tìm kiếm"
                  onClick={() => updateSearchKeyword('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5 cursor-pointer"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {headerExtra}

            {showExpandCollapseButtons && (
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => expandAll()}
                  className="h-8 rounded-lg px-2.5 text-caption-1-sb text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer transition-colors"
                >
                  Mở tất cả
                </button>
                <button
                  type="button"
                  onClick={() => collapseAll()}
                  className="h-8 rounded-lg px-2.5 text-caption-1-sb text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer transition-colors"
                >
                  Thu gọn
                </button>
              </div>
            )}
          </div>
        ) : null}

        {/* Tree Content */}
        <div className="flex flex-col gap-0.5 overflow-y-auto max-h-[520px]">
          {filteredNodes.length > 0 ? (
            filteredNodes.map((node, index) =>
              renderTreeNode(node, 0, index === filteredNodes.length - 1),
            )
          ) : (
            <div className="py-6 text-center text-body-2-rg text-muted-foreground">
              {emptyText}
            </div>
          )}
        </div>
      </div>
    );
  },
);

TreeView.displayName = 'TreeView';

export default TreeView;
