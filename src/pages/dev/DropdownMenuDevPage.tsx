import { Edit2, Eye, MoreHorizontal, Trash } from 'lucide-react';
import { useState } from 'react';

import { DevBreadcrumb } from '@/pages/dev/_DevBreadcrumb';
import { Button } from '@/shared/components/ui/button';
import { CodePreview } from '@/shared/components/ui/code-block';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { IconButton } from '@/shared/components/ui/icon-button';

const actionMenuCode = `import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/shared/components/ui/dropdown-menu';
import { Button } from '@/shared/components/ui/button';
import { Eye, Edit2, Trash } from 'lucide-react';

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Thao tác dữ liệu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56">
    <DropdownMenuLabel>Tác vụ chính</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem className="gap-2">
      <Eye size={16} />
      <span>Xem chi tiết</span>
    </DropdownMenuItem>
    <DropdownMenuItem className="gap-2">
      <Edit2 size={16} />
      <span>Chỉnh sửa thông tin</span>
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
      <Trash size={16} />
      <span>Xóa bản ghi</span>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`;

const checkboxMenuCode = `import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/shared/components/ui/dropdown-menu';
import { Button } from '@/shared/components/ui/button';

export function CheckboxMenuExample() {
  const [bookmarked, setBookmarked] = useState(true);
  const [showArchived, setShowArchived] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Tùy chỉnh hiển thị</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Cấu hình bộ lọc</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked={bookmarked} onCheckedChange={setBookmarked}>
          Đã đánh dấu sao
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={showArchived} onCheckedChange={setShowArchived}>
          Hiển thị mục lưu trữ
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}`;

export const DropdownMenuDevPage = () => {
  const [bookmarked, setBookmarked] = useState(true);
  const [showArchived, setShowArchived] = useState(false);

  return (
    <div className="min-h-screen w-full space-y-8 bg-background p-6">
      <DevBreadcrumb label="Dropdown Menu" />
      <div className="space-y-1">
        <h1 className="text-heading-3 font-bold text-foreground">Dropdown Menu</h1>
        <p className="text-body-1-rg text-muted-foreground">
          Menu thả xuống cho các thao tác hàng loạt, menu tác vụ theo dòng và tùy chọn hiển thị.
        </p>
      </div>

      {/* ── 1. Action Menu ── */}
      <CodePreview
        title="1. Menu thao tác dạng nút bấm"
        description="Kích hoạt từ một nút bấm thường kèm icon thao tác."
        code={actionMenuCode}
      >
        <div className="flex flex-wrap items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Thao tác dữ liệu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Tác vụ chính</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2">
                <Eye size={16} />
                <span>Xem chi tiết</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <Edit2 size={16} />
                <span>Chỉnh sửa thông tin</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
                <Trash size={16} />
                <span>Xóa bản ghi</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <IconButton variant="secondary" icon={<MoreHorizontal size={18} />} aria-label="Tùy chọn" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-52">
              <DropdownMenuLabel>Tùy chọn dòng</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Sao chép liên kết</DropdownMenuItem>
              <DropdownMenuItem>Chia sẻ quyền truy cập</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive">Xóa</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CodePreview>

      {/* ── 2. Checkbox Items ── */}
      <CodePreview
        title="2. Menu có hộp kiểm (Checkbox Items)"
        description="Bật / tắt các chế độ hiển thị hoặc bộ lọc cột."
        code={checkboxMenuCode}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Tùy chỉnh hiển thị</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Cấu hình bộ lọc</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked={bookmarked} onCheckedChange={setBookmarked}>
              Đã đánh dấu sao
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked={showArchived} onCheckedChange={setShowArchived}>
              Hiển thị mục lưu trữ
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CodePreview>
    </div>
  );
};

export default DropdownMenuDevPage;
