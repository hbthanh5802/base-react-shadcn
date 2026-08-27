import { useState } from 'react';

import { DevBreadcrumb } from '@/pages/dev/_DevBreadcrumb';
import { Button } from '@/shared/components/ui/button';
import { CodePreview } from '@/shared/components/ui/code-block';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog';

const basicDialogCode = `import { useState } from 'react';
import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/shared/components/ui/dialog';

export function BasicDialogExample() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Mở Dialog tiêu chuẩn</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Xác nhận thao tác</DialogTitle>
          <DialogDescription>
            Hệ thống sẽ lưu lại các thay đổi của bạn và áp dụng ngay lập tức.
          </DialogDescription>
        </DialogHeader>
        <div className="py-2 text-body-2-rg text-muted-foreground">
          Bạn có chắc chắn muốn tiếp tục thực hiện hành động này không?
        </div>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>Hủy bỏ</Button>
          <Button onClick={() => setOpen(false)}>Đồng ý</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}`;

const destructiveDialogCode = `import { useState } from 'react';
import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/shared/components/ui/dialog';

export function DestructiveDialogExample() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Mở Dialog cảnh báo xóa</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-destructive">Xác nhận xóa dữ liệu</DialogTitle>
          <DialogDescription>
            Dữ liệu sau khi xóa sẽ không thể khôi phục. Vui lòng kiểm tra kỹ trước khi xác nhận.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>Giữ lại</Button>
          <Button variant="destructive" onClick={() => setOpen(false)}>Xóa vĩnh viễn</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}`;

export const DialogDevPage = () => {
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <div className="min-h-screen w-full space-y-8 bg-background p-6">
      <DevBreadcrumb label="Dialog" />
      <div className="space-y-1">
        <h1 className="text-heading-3 font-bold text-foreground">Dialog & Modal</h1>
        <p className="text-body-1-rg text-muted-foreground">
          Hộp thoại nổi hỗ trợ xác nhận hành động, hiển thị thông báo quan trọng và nhập biểu mẫu.
        </p>
      </div>

      {/* ── 1. Basic Dialog ── */}
      <CodePreview
        title="1. Hộp thoại thông tin cơ bản"
        description="Hiển thị nội dung chi tiết kèm nút hành động."
        code={basicDialogCode}
      >
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Mở Dialog tiêu chuẩn</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Xác nhận thao tác</DialogTitle>
              <DialogDescription>
                Hệ thống sẽ lưu lại các thay đổi của bạn và áp dụng ngay lập tức cho toàn bộ dữ liệu liên quan.
              </DialogDescription>
            </DialogHeader>
            <div className="py-2 text-body-2-rg text-muted-foreground">
              Bạn có chắc chắn muốn tiếp tục thực hiện hành động này không?
            </div>
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Hủy bỏ
              </Button>
              <Button onClick={() => setOpen(false)}>Đồng ý</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CodePreview>

      {/* ── 2. Destructive Dialog ── */}
      <CodePreview
        title="2. Hộp thoại cảnh báo nguy hiểm"
        description="Xác nhận trước khi thực hiện xóa dữ liệu quan trọng."
        code={destructiveDialogCode}
      >
        <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
          <DialogTrigger asChild>
            <Button variant="destructive">Mở Dialog cảnh báo xóa</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-destructive">Xác nhận xóa dữ liệu</DialogTitle>
              <DialogDescription>
                Dữ liệu sau khi xóa sẽ không thể khôi phục. Vui lòng kiểm tra kỹ trước khi xác nhận.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setConfirmOpen(false)}>
                Giữ lại
              </Button>
              <Button variant="destructive" onClick={() => setConfirmOpen(false)}>
                Xóa vĩnh viễn
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CodePreview>
    </div>
  );
};

export default DialogDevPage;
