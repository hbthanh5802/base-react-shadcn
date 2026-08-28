import * as React from 'react';

export interface TreeNode<T = any> {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  disabled?: boolean;
  selectable?: boolean;
  isLeaf?: boolean; // true = chắc chắn là lá; false = có thể mở rộng / tải con từ backend
  isLoading?: boolean; // trạng thái đang tải của node này
  isStale?: boolean; // nếu true, khi mở node sẽ luôn gọi loadData tải mới
  staleOnCollapse?: boolean; // nếu true, khi thu gọn node này sẽ đánh dấu stale để lần mở tới gọi lại API
  children?: TreeNode<T>[];
  data?: T;
}

export type TreeSelectionMode = 'single' | 'multiple' | 'checkbox' | 'none';

export interface TreeViewRef {
  expandAll: () => void;
  collapseAll: (options?: { markStale?: boolean }) => void;
  expandNode: (id: string) => void;
  collapseNode: (
    id: string,
    options?: { includeDescendants?: boolean; markStale?: boolean } | boolean,
  ) => void;
  invalidateNode: (id: string) => void; // Đánh dấu 1 node là stale để lần mở tới fetch lại
  invalidateAll: () => void; // Đánh dấu toàn bộ cây là stale để fetch lại khi mở
  setSearchKeyword: (keyword: string) => void;
}

export interface TreeViewProps<T = any> {
  data: TreeNode<T>[];
  selectionMode?: TreeSelectionMode;
  selectedKeys?: string[];
  defaultSelectedKeys?: string[];
  onSelectionChange?: (selectedKeys: string[], selectedNodes: TreeNode<T>[]) => void;
  expandedKeys?: string[];
  defaultExpandedKeys?: string[];
  onExpandedChange?: (expandedKeys: string[]) => void;
  autoExpandParent?: boolean;

  // ── Async Backend Data Loading & Cache Invalidation ──
  loadData?: (node: TreeNode<T>) => Promise<TreeNode<T>[] | void>;
  loadedKeys?: string[];
  onLoadedChange?: (loadedKeys: string[]) => void;
  staleOnCollapse?: boolean; // Khi thu gọn node, tự động đánh dấu stale để mở lại sẽ refetch data mới

  showLines?: boolean;
  showIcons?: boolean;
  emptyText?: string;
  expandOnClickRow?: boolean;
  className?: string;

  // ── Custom Header & Search Control ──
  searchable?: boolean;
  searchPlaceholder?: string;
  searchKeyword?: string;
  onSearchKeywordChange?: (keyword: string) => void;
  showExpandCollapseButtons?: boolean;
  headerExtra?: React.ReactNode;
  renderHeader?: (context: {
    searchKeyword: string;
    setSearchKeyword: (val: string) => void;
    expandAll: () => void;
    collapseAll: () => void;
  }) => React.ReactNode;

  // ── Custom Rendering & Actions ──
  customExpandIcon?: (context: {
    isExpanded: boolean;
    isLoading: boolean;
    isLeaf: boolean;
  }) => React.ReactNode;
  customNodeIcon?: (
    node: TreeNode<T>,
    context: { isExpanded: boolean; isLeaf: boolean },
  ) => React.ReactNode;
  renderNode?: (
    node: TreeNode<T>,
    context: {
      isExpanded: boolean;
      isSelected: boolean;
      isIndeterminate: boolean;
      isLoading: boolean;
      depth: number;
    },
  ) => React.ReactNode;
  nodeActions?: (node: TreeNode<T>) => React.ReactNode;
}

export interface TreeSelectProps<T = any>
  extends Omit<TreeViewProps<T>, 'className' | 'renderNode'> {
  value?: string | string[];
  defaultValue?: string | string[];
  onChange?: (value: string | string[], selectedNodes: TreeNode<T>[]) => void;
  placeholder?: string;
  disabled?: boolean;
  allowClear?: boolean;
  multiple?: boolean;
  className?: string;
  popoverClassName?: string;
}

// ── Tree Helper Utilities ──

/** Lấy tất cả ID của toàn bộ cây */
export function getAllNodeKeys<T>(nodes: TreeNode<T>[]): string[] {
  const keys: string[] = [];
  function traverse(list: TreeNode<T>[]) {
    for (const node of list) {
      keys.push(node.id);
      if (node.children?.length) {
        traverse(node.children);
      }
    }
  }
  traverse(nodes);
  return keys;
}

/** Lấy danh sách toàn bộ ID con cháu của 1 node (chỉ lấy các node có selectable !== false) */
export function getDescendantKeys<T>(node: TreeNode<T>): string[] {
  const keys: string[] = [];
  if (node.selectable !== false) {
    keys.push(node.id);
  }
  if (node.children?.length) {
    for (const child of node.children) {
      keys.push(...getDescendantKeys(child));
    }
  }
  return keys;
}

/** Tìm 1 node theo ID */
export function findNodeById<T>(nodes: TreeNode<T>[], id: string): TreeNode<T> | null {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.children?.length) {
      const found = findNodeById(node.children, id);
      if (found) return found;
    }
  }
  return null;
}

/** Lấy danh sách TreeNode ứng với danh sách ID */
export function getNodesByIds<T>(nodes: TreeNode<T>[], ids: string[]): TreeNode<T>[] {
  const idSet = new Set(ids);
  const result: TreeNode<T>[] = [];
  function traverse(list: TreeNode<T>[]) {
    for (const node of list) {
      if (idSet.has(node.id)) {
        result.push(node);
      }
      if (node.children?.length) {
        traverse(node.children);
      }
    }
  }
  traverse(nodes);
  return result;
}

/** Lấy đường dẫn ID cha của 1 node (để auto-expand khi tìm kiếm) */
export function getParentKeysToNode<T>(nodes: TreeNode<T>[], targetId: string): string[] {
  const parents: string[] = [];
  function findPath(list: TreeNode<T>[], currentParents: string[]): boolean {
    for (const node of list) {
      if (node.id === targetId) {
        parents.push(...currentParents);
        return true;
      }
      if (node.children?.length) {
        if (findPath(node.children, [...currentParents, node.id])) {
          return true;
        }
      }
    }
    return false;
  }
  findPath(nodes, []);
  return parents;
}

/** Lọc cây theo từ khóa tìm kiếm và trả về cây đã lọc + các node cần mở rộng */
export function filterTreeByKeyword<T>(
  nodes: TreeNode<T>[],
  keyword: string,
): { filteredNodes: TreeNode<T>[]; matchedExpandKeys: string[] } {
  if (!keyword.trim()) {
    return { filteredNodes: nodes, matchedExpandKeys: [] };
  }

  const lowerKw = keyword.toLowerCase().trim();
  const expandKeySet = new Set<string>();

  function filter(list: TreeNode<T>[], parentIds: string[]): TreeNode<T>[] {
    const result: TreeNode<T>[] = [];

    for (const node of list) {
      const labelText = typeof node.label === 'string' ? node.label : String(node.id);
      const isMatch = labelText.toLowerCase().includes(lowerKw);

      let filteredChildren: TreeNode<T>[] = [];
      if (node.children?.length) {
        filteredChildren = filter(node.children, [...parentIds, node.id]);
      }

      if (isMatch || filteredChildren.length > 0) {
        if (filteredChildren.length > 0 || isMatch) {
          parentIds.forEach((pid) => expandKeySet.add(pid));
        }
        result.push({
          ...node,
          children: filteredChildren.length > 0 ? filteredChildren : node.children,
        });
      }
    }

    return result;
  }

  const filteredNodes = filter(nodes, []);
  return { filteredNodes, matchedExpandKeys: Array.from(expandKeySet) };
}

/** Tính toán trạng thái Tri-state Checkbox (Checked / Indeterminate / Unchecked) */
export function computeNodeCheckboxState<T>(
  node: TreeNode<T>,
  selectedKeysSet: Set<string>,
): { isChecked: boolean; isIndeterminate: boolean } {
  if (!node.children || node.children.length === 0) {
    if (node.selectable === false) {
      return { isChecked: false, isIndeterminate: false };
    }
    const isChecked = selectedKeysSet.has(node.id);
    return { isChecked, isIndeterminate: false };
  }

  const selectableChildren = node.children.filter(
    (c) => c.selectable !== false || (c.children && c.children.length > 0),
  );
  if (selectableChildren.length === 0) {
    return { isChecked: false, isIndeterminate: false };
  }

  let allChildrenChecked = true;
  let hasAnyCheckedChild = false;

  for (const child of selectableChildren) {
    const childState = computeNodeCheckboxState(child, selectedKeysSet);
    if (childState.isChecked || childState.isIndeterminate) {
      hasAnyCheckedChild = true;
    }
    if (!childState.isChecked) {
      allChildrenChecked = false;
    }
  }

  if (allChildrenChecked) {
    return { isChecked: true, isIndeterminate: false };
  }

  if (hasAnyCheckedChild || (node.selectable !== false && selectedKeysSet.has(node.id))) {
    return { isChecked: false, isIndeterminate: true };
  }

  return { isChecked: false, isIndeterminate: false };
}

/** Cập nhật selectedKeys theo cơ chế Cascade Tri-state */
export function handleCheckboxCascadeToggle<T>(
  allNodes: TreeNode<T>[],
  currentSelectedKeys: string[],
  toggledNode: TreeNode<T>,
  targetChecked: boolean,
): string[] {
  const newSet = new Set(currentSelectedKeys);
  const descendantKeys = getDescendantKeys(toggledNode);

  if (targetChecked) {
    // Check node này và toàn bộ con cháu (chỉ những node selectable !== false)
    descendantKeys.forEach((k) => newSet.add(k));
  } else {
    // Uncheck node này và toàn bộ con cháu
    descendantKeys.forEach((k) => newSet.delete(k));
  }

  // Đồng bộ lại trạng thái cha lên đến gốc
  function syncParents(list: TreeNode<T>[]): void {
    for (const node of list) {
      if (node.children?.length) {
        syncParents(node.children);
        if (node.selectable !== false) {
          const { isChecked } = computeNodeCheckboxState(node, newSet);
          if (isChecked) {
            newSet.add(node.id);
          } else {
            newSet.delete(node.id);
          }
        }
      }
    }
  }

  syncParents(allNodes);
  return Array.from(newSet);
}

/** Cập nhật children cho 1 node cha sau khi tải dữ liệu async */
export function updateNodeChildrenInTree<T>(
  nodes: TreeNode<T>[],
  parentId: string,
  newChildren: TreeNode<T>[],
): TreeNode<T>[] {
  return nodes.map((node) => {
    if (node.id === parentId) {
      return {
        ...node,
        children: newChildren,
        isLoading: false,
      };
    }
    if (node.children?.length) {
      return {
        ...node,
        children: updateNodeChildrenInTree(node.children, parentId, newChildren),
      };
    }
    return node;
  });
}
