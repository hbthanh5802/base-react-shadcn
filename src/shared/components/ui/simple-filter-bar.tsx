import { FilterSearch } from 'iconsax-react';
import { Search } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/shared/components/ui/button';
import { DatePicker } from '@/shared/components/ui/date-picker';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';

export interface FilterItem {
  key: string;
  label?: string;
  type: 'input' | 'select' | 'date';
  placeholder?: string;
  options?: { label: string; value: string }[];
}

interface SimpleFilterBarProps {
  items: FilterItem[];
  onApplyFilter: (filters: Record<string, string>) => void;
  gridCols?: 2 | 3 | 4;
}

const gridClassMap: Record<number, string> = {
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
};

export function SimpleFilterBar({ items, onApplyFilter, gridCols }: SimpleFilterBarProps) {
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});

  const handleChange = (key: string, value: string) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setFilterValues({});
    onApplyFilter({});
  };

  const handleSearch = () => {
    onApplyFilter(filterValues);
  };

  if (gridCols) {
    const gridClass = gridClassMap[gridCols] || 'md:grid-cols-4';

    return (
      <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-4 shadow-xs">
        <div className={`grid grid-cols-1 gap-4 ${gridClass}`}>
          {items.map((item) => (
            <div key={item.key} className="flex flex-col gap-1.5">
              {item.label && (
                <Label className="text-body-3-md text-foreground">{item.label}</Label>
              )}

              {item.type === 'input' ? (
                <Input
                  placeholder={item.placeholder}
                  value={filterValues[item.key] || ''}
                  onChange={(e) => handleChange(item.key, e.target.value)}
                  className="w-full"
                />
              ) : item.type === 'select' ? (
                <Select
                  value={filterValues[item.key] || ''}
                  onValueChange={(val) => handleChange(item.key, val)}
                >
                  <SelectTrigger className="h-10 w-full text-body-2-rg text-foreground">
                    <SelectValue placeholder={item.placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">Tất cả</SelectItem>
                    {item.options?.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <DatePicker
                  value={filterValues[item.key] ? new Date(filterValues[item.key]) : null}
                  onValueChange={(val) => handleChange(item.key, val ? val.toISOString() : '')}
                  placeholder={item.placeholder}
                  className="w-full"
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-3">
          <Button
            variant="outlinePrimary"
            size="medium"
            onClick={handleReset}
          >
            Làm mới
          </Button>
          <Button
            variant="default"
            iconLayout="left"
            size="medium"
            onClick={handleSearch}
          >
            <Search size={16} />
            Tìm kiếm
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-lg border border-border bg-card p-3 shadow-xs">
      {items.map((item) => {
        if (item.type === 'input') {
          return (
            <div key={item.key} className="min-w-[200px] flex-1">
              <Input
                placeholder={item.placeholder}
                value={filterValues[item.key] || ''}
                onChange={(e) => handleChange(item.key, e.target.value)}
                className="w-full"
              />
            </div>
          );
        }

        if (item.type === 'select') {
          return (
            <div key={item.key} className="w-[180px]">
              <Select
                value={filterValues[item.key] || ''}
                onValueChange={(val) => handleChange(item.key, val)}
              >
                <SelectTrigger className="w-full text-body-2-rg text-foreground">
                  <SelectValue placeholder={item.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">Tất cả</SelectItem>
                  {item.options?.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          );
        }

        if (item.type === 'date') {
          return (
            <div key={item.key} className="w-[180px]">
              <DatePicker
                value={filterValues[item.key] ? new Date(filterValues[item.key]) : null}
                onValueChange={(val) => handleChange(item.key, val ? val.toISOString() : '')}
                placeholder={item.placeholder}
                className="w-full"
              />
            </div>
          );
        }

        return null;
      })}

      <Button
        type="button"
        onClick={handleSearch}
        className="gap-2"
        variant="default"
      >
        <FilterSearch size={18} />
        Bộ lọc
      </Button>
    </div>
  );
}
