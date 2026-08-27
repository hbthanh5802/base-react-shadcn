import type { SelectOption } from '@/shared/components/form/fields/select-field';

export type IdentityCatalogType = 'military-rank' | 'position' | 'role-group' | 'role';

export function normalizeIdentityResponse<T>(res: unknown): { data: T[]; totalPages: number } {
  let items: T[] = [];
  let totalPages = 0;

  if (Array.isArray(res)) {
    items = res as T[];
    totalPages = 1;
  } else if (res && typeof res === 'object') {
    const obj = res as Record<string, unknown>;
    if (Array.isArray(obj.data)) {
      items = obj.data as T[];
    } else if (Array.isArray(obj.items)) {
      items = obj.items as T[];
    } else if (Array.isArray(obj.content)) {
      items = obj.content as T[];
    }

    if (obj.metaData && typeof obj.metaData === 'object') {
      const meta = obj.metaData as Record<string, unknown>;
      totalPages = (meta.totalPages as number) ?? (items.length > 0 ? 1 : 0);
    } else {
      totalPages = (obj.totalPages as number) ?? (items.length > 0 ? 1 : 0);
    }
  }

  return { data: items, totalPages };
}

export function mapIdentityItemsToOptions(
  items: Record<string, unknown>[],
  catalogType: IdentityCatalogType,
  valueKey: 'id' | 'code' | 'name' = 'id',
): SelectOption[] {
  return items.map((item) => {
    let label = '';
    let nameValue = '';
    let codeValue = '';

    switch (catalogType) {
      case 'military-rank':
        label = String(item.name ?? item.id ?? '');
        nameValue = String(item.name ?? item.id ?? '');
        codeValue = String(item.code ?? item.name ?? item.id ?? '');
        break;

      case 'position':
        label = String(item.positionName ?? item.id ?? '');
        nameValue = String(item.positionName ?? item.id ?? '');
        codeValue = String(item.positionCode ?? item.positionName ?? item.id ?? '');
        break;

      case 'role-group':
        label = String(item.roleGroupName ?? item.id ?? '');
        nameValue = String(item.roleGroupName ?? item.id ?? '');
        codeValue = String(item.roleGroupCode ?? item.roleGroupName ?? item.id ?? '');
        break;

      case 'role':
        label = String(item.name ?? item.roleName ?? item.id ?? '');
        nameValue = String(item.name ?? item.roleName ?? item.id ?? '');
        codeValue = String(item.code ?? item.roleCode ?? item.name ?? item.id ?? '');
        break;
    }

    let value: string;
    if (valueKey === 'code') {
      value = codeValue;
    } else if (valueKey === 'name') {
      value = nameValue;
    } else {
      value = String(item.id);
    }

    return {
      label,
      value,
      original: item,
    };
  });
}
