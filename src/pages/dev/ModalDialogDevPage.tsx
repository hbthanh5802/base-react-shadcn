import { Danger, InfoCircle, TickCircle } from 'iconsax-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { DevBreadcrumb } from '@/pages/dev/_DevBreadcrumb';
import { Button } from '@/shared/components/ui/button';
import { CodePreview } from '@/shared/components/ui/code-block';
import { Icon } from '@/shared/components/ui/icon';
import { IconButton } from '@/shared/components/ui/icon-button';
import { InputGlobal } from '@/shared/components/ui/input-global';
import {
  ModalDialog,
  type ModalDialogSize,
} from '@/shared/components/ui/modal-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { X } from 'lucide-react';

const basicUsageCode = `import { useState } from 'react';
import { ModalDialog } from '@/shared/components/ui/modal-dialog';
import { Button } from '@/shared/components/ui/button';
import { toast } from 'sonner';

export const Example = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Mở Modal Xác nhận</Button>

      <ModalDialog
        open={isOpen}
        onOpenChange={setIsOpen}
        title="Xác nhận lưu thay đổi"
        description="Mọi thông tin vừa cập nhật sẽ được đồng bộ vào hệ thống quản lý."
        confirmText="Lưu dữ liệu"
        cancelText="Để sau"
        onConfirm={() => {
          toast.success('Đã lưu dữ liệu thành công!');
          setIsOpen(false);
        }}
      >
        <div className="space-y-2">
          <p className="text-body-2-rg text-foreground">
            Bạn có chắc chắn muốn xuất bản bản sửa đổi này lên môi trường trực tiếp?
          </p>
          <div className="rounded-lg bg-muted/40 p-3 text-caption-1-rg text-muted-foreground">
            Mã phiên bản: <code>v2.4.0-prod</code> • Thời gian tạo: Vừa xong
          </div>
        </div>
      </ModalDialog>
    </>
  );
};`;

const destructiveUsageCode = `import { useState } from 'react';
import { ModalDialog } from '@/shared/components/ui/modal-dialog';
import { Button } from '@/shared/components/ui/button';
import { Danger } from 'iconsax-react';
import { toast } from 'sonner';

export const Example = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="destructive" onClick={() => setIsOpen(true)}>
        Xóa tài khoản
      </Button>

      <ModalDialog
        open={isOpen}
        onOpenChange={setIsOpen}
        icon={<Danger size={24} variant="Bold" className="text-destructive" />}
        title="Xóa vĩnh viễn tài khoản?"
        description="Hành động này không thể hoàn tác. Toàn bộ dữ liệu hồ sơ và lịch sử dự án sẽ bị xóa."
        confirmText="Xóa tài khoản"
        confirmVariant="destructive"
        size="sm"
        onConfirm={() => {
          toast.error('Đã xóa tài khoản vĩnh viễn!');
          setIsOpen(false);
        }}
      >
        <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-3.5 text-caption-1-rg text-destructive">
          Lưu ý: Tất cả các API Token và dữ liệu liên kết cũng sẽ bị hủy kích hoạt ngay lập tức.
        </div>
      </ModalDialog>
    </>
  );
};`;

const asyncUsageCode = `import { useState } from 'react';
import { ModalDialog } from '@/shared/components/ui/modal-dialog';
import { Button } from '@/shared/components/ui/button';
import { InfoCircle } from 'iconsax-react';
import { toast } from 'sonner';

export const Example = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="outline" onClick={() => setIsOpen(true)}>
        Đồng bộ đám mây (Async)
      </Button>

      <ModalDialog
        open={isOpen}
        onOpenChange={setIsOpen}
        icon={<InfoCircle size={24} variant="Bold" className="text-primary" />}
        title="Đồng bộ dữ liệu đám mây"
        description="Tự động hiển thị trạng thái tải khi onConfirm trả về Promise."
        confirmText="Bắt đầu đồng bộ"
        onConfirm={async () => {
          // Tự động kích hoạt spinner loading ở nút Xác nhận
          await new Promise((resolve) => setTimeout(resolve, 2000));
          toast.success('Đồng bộ 1.250 tệp tin thành công!');
          setIsOpen(false);
        }}
      >
        <p className="text-body-2-rg text-foreground">
          Hệ thống sẽ tải lên 1.250 tệp tin sang máy chủ lưu trữ dự phòng. Quá trình này mất khoảng 2 giây.
        </p>
      </ModalDialog>
    </>
  );
};`;

const formUsageCode = `import { useState } from 'react';
import { ModalDialog } from '@/shared/components/ui/modal-dialog';
import { InputGlobal } from '@/shared/components/ui/input-global';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import { Button } from '@/shared/components/ui/button';
import { toast } from 'sonner';

export const FormModalExample = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('developer');

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Mở Form Thêm Thành Viên</Button>

      <ModalDialog
        open={isOpen}
        onOpenChange={setIsOpen}
        title="Thêm thành viên mới"
        description="Nhập thông tin nhân sự để phân quyền truy cập vào dự án."
        confirmText="Tạo hồ sơ"
        size="lg"
        preventCloseOnOverlayClick
        onConfirm={() => {
          if (!userName.trim()) {
            toast.error('Vui lòng nhập họ và tên!');
            return;
          }
          toast.success(\`Đã thêm thành viên \${userName} (\${userRole})!\`);
          setUserName('');
          setIsOpen(false);
        }}
      >
        <div className="space-y-4 py-1">
          <div>
            <label className="text-caption-1-sb text-foreground mb-1.5 block">Họ và tên *</label>
            <InputGlobal
              placeholder="Ví dụ: Nguyễn Văn A"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div>
            <label className="text-caption-1-sb text-foreground mb-1.5 block">Vai trò trong hệ thống</label>
            <Select value={userRole} onValueChange={setUserRole}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn vai trò" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Quản trị viên (Admin)</SelectItem>
                <SelectItem value="developer">Lập trình viên (Developer)</SelectItem>
                <SelectItem value="designer">Thiết kế UI/UX (Designer)</SelectItem>
                <SelectItem value="viewer">Chỉ xem (Viewer)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-lg border border-border bg-muted/20 p-3 space-y-1">
            <p className="text-caption-1-sb text-foreground">Quyền hạn áp dụng</p>
            <p className="text-caption-2-rg text-muted-foreground">
              Thành viên sẽ nhận được email kích hoạt kèm hướng dẫn đăng nhập lần đầu.
            </p>
          </div>
        </div>
      </ModalDialog>
    </>
  );
};`;

const sizeUsageCode = `import { useState } from 'react';
import { ModalDialog, type ModalDialogSize } from '@/shared/components/ui/modal-dialog';
import { Button } from '@/shared/components/ui/button';

// Hỗ trợ 6 kích thước tiêu chuẩn:
// sm (448px), md (512px - mặc định), lg (672px), xl (896px), 2xl (1152px), full (95vw)

const [isOpen, setIsOpen] = useState(false);
const [size, setSize] = useState<ModalDialogSize>('lg');

<ModalDialog
  open={isOpen}
  onOpenChange={setIsOpen}
  size={size}
  title={\`Hộp thoại kích thước: \${size.toUpperCase()}\`}
  description="Kích thước co giãn linh hoạt theo tỷ lệ màn hình."
  confirmText="Đồng ý"
>
  <div className="p-6 text-center text-muted-foreground">
    Vùng nội dung bên trong kích thước {size}.
  </div>
</ModalDialog>`;

const customUsageCode = `import { useState } from 'react';
import { ModalDialog } from '@/shared/components/ui/modal-dialog';
import { Button } from '@/shared/components/ui/button';
import { TickCircle } from 'iconsax-react';
import { Icon } from '@/shared/components/ui/icon';
import { X } from 'lucide-react';

export const CustomHeaderFooterExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="secondPrimary" onClick={() => setIsOpen(true)}>
        Mở Modal Custom Header/Footer
      </Button>

      <ModalDialog
        open={isOpen}
        onOpenChange={setIsOpen}
        renderHeader={({ onClose }) => (
          <div className="flex items-center justify-between border-b border-primary-700 bg-primary px-6 py-4 text-primary-foreground">
            <div className="flex items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-lg bg-white/20">
                <TickCircle size={20} variant="Bold" className="text-white" />
              </div>
              <div>
                <h3 className="text-title-2 font-bold text-white">Thành tích mới mở khóa!</h3>
                <p className="text-caption-1-rg text-white/80">Bạn vừa nhận được chứng nhận mới</p>
              </div>
            </div>
            <IconButton
              size="small"
              shape="circle"
              icon={
                <Icon
                  icon={X}
                  className="text-primary-200 hover:text-primary-600"
                />
              }
              variant="text"
              onClick={onClose}
              className="cursor-pointer"
            />
          </div>
        )}
        renderFooter={({ onCancel }) => (
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-1.5 text-caption-1-rg text-muted-foreground">
              <span>Hạn nhận:</span>
              <strong className="text-foreground font-medium">30 ngày</strong>
            </div>
            <div className="flex items-center gap-2.5">
              <Button variant="ghost" size="medium" onClick={onCancel}>
                Để sau
              </Button>
              <Button variant="default" size="medium" onClick={onCancel}>
                Nhận thưởng ngay
              </Button>
            </div>
          </div>
        )}
      >
        <div className="space-y-3 py-4 text-center">
          <div className="text-5xl animate-bounce">🎉</div>
          <p className="text-title-2 font-bold text-foreground">Chúc mừng bạn đã hoàn thành khóa học!</p>
          <p className="text-body-2-rg text-muted-foreground max-w-sm mx-auto">
            Bạn đã hoàn thành xuất sắc tất cả các bài kiểm tra thực hành với điểm số tối đa.
          </p>
        </div>
      </ModalDialog>
    </>
  );
};`;

export const ModalDialogDevPage = () => {
  // Modal states
  const [basicOpen, setBasicOpen] = useState(false);
  const [destructiveOpen, setDestructiveOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [asyncOpen, setAsyncOpen] = useState(false);
  const [customOpen, setCustomOpen] = useState(false);
  const [sizeOpen, setSizeOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<ModalDialogSize>('md');

  // Form states
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('developer');

  return (
    <div className="min-h-screen w-full space-y-8 bg-background p-6">
      <DevBreadcrumb label="Modal Dialog" />
      <div className="space-y-1">
        <h1 className="text-heading-3 font-bold text-foreground">
          Modal Dialog
        </h1>
        <p className="text-body-1-rg text-muted-foreground">
          Component hộp thoại cấp cao (High-level Dialog/Modal) xây dựng theo
          chuẩn UI/UX Pro Max, hỗ trợ tiêu đề, nút hành động, xử lý Promise bất
          đồng bộ và cuộn nội dung tự động.
        </p>
      </div>

      {/* ── 1. Basic Confirm Dialog ── */}
      <CodePreview
        title="1. Hộp thoại xác nhận cơ bản (Basic Confirm Modal)"
        description="Bao gồm tiêu đề, mô tả, nút Xác nhận & Hủy cùng sự kiện onConfirm, onCancel tiện lợi."
        code={basicUsageCode}
      >
        <div className="flex items-center gap-3">
          <Button onClick={() => setBasicOpen(true)}>Mở Modal Xác nhận</Button>

          <ModalDialog
            open={basicOpen}
            onOpenChange={setBasicOpen}
            title="Xác nhận lưu thay đổi"
            description="Mọi thông tin vừa cập nhật sẽ được đồng bộ vào hệ thống quản lý."
            confirmText="Lưu dữ liệu"
            cancelText="Để sau"
            onConfirm={() => {
              toast.success('Đã lưu dữ liệu thành công!');
              setBasicOpen(false);
            }}
          >
            <div className="space-y-2">
              <p className="text-body-2-rg text-foreground">
                Bạn có chắc chắn muốn xuất bản bản sửa đổi này lên môi trường
                trực tiếp?
              </p>
              <div className="rounded-lg bg-muted/40 p-3 text-caption-1-rg text-muted-foreground">
                Mã phiên bản: <code>v2.4.0-prod</code> • Thời gian tạo: Vừa xong
              </div>
            </div>
          </ModalDialog>
        </div>
      </CodePreview>

      {/* ── 2. Destructive Modal ── */}
      <CodePreview
        title="2. Hộp thoại cảnh báo & Xóa dữ liệu (Destructive Alert Modal)"
        description="Tích hợp icon trạng thái, kích thước nhỏ gọn size='sm' và nút xác nhận cảnh báo confirmVariant='destructive'."
        code={destructiveUsageCode}
      >
        <div className="flex items-center gap-3">
          <Button
            variant="destructive"
            onClick={() => setDestructiveOpen(true)}
          >
            Xóa tài khoản
          </Button>

          <ModalDialog
            open={destructiveOpen}
            onOpenChange={setDestructiveOpen}
            icon={
              <Danger size={24} variant="Bold" className="text-destructive" />
            }
            title="Xóa vĩnh viễn tài khoản?"
            description="Hành động này không thể hoàn tác. Toàn bộ dữ liệu hồ sơ và lịch sử dự án sẽ bị xóa."
            confirmText="Xóa tài khoản"
            confirmVariant="destructive"
            size="sm"
            onConfirm={() => {
              toast.error('Đã xóa tài khoản vĩnh viễn!');
              setDestructiveOpen(false);
            }}
          >
            <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-3.5 text-caption-1-rg text-destructive">
              Lưu ý: Tất cả các API Token và dữ liệu liên kết cũng sẽ bị hủy
              kích hoạt ngay lập tức.
            </div>
          </ModalDialog>
        </div>
      </CodePreview>

      {/* ── 3. Async Action Modal ── */}
      <CodePreview
        title="3. Hộp thoại hành động Bất đồng bộ (Async Action with Auto-Loading)"
        description="Khi onConfirm trả về một Promise, ModalDialog sẽ tự động kích hoạt spinner loading và khóa các nút để tránh người dùng bấm trùng lặp."
        code={asyncUsageCode}
      >
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => setAsyncOpen(true)}>
            Đồng bộ dữ liệu đám mây (Async 2s)
          </Button>

          <ModalDialog
            open={asyncOpen}
            onOpenChange={setAsyncOpen}
            icon={
              <InfoCircle size={24} variant="Bold" className="text-primary" />
            }
            title="Đồng bộ dữ liệu đám mây"
            description="Tự động hiển thị trạng thái tải khi onConfirm trả về Promise."
            confirmText="Bắt đầu đồng bộ"
            onConfirm={async () => {
              await new Promise((resolve) => setTimeout(resolve, 2000));
              toast.success('Đồng bộ 1.250 tệp tin thành công!');
              setAsyncOpen(false);
            }}
          >
            <p className="text-body-2-rg text-foreground">
              Hệ thống sẽ tải lên 1.250 tệp tin sang máy chủ lưu trữ dự phòng.
              Quá trình này mất khoảng 2 giây.
            </p>
          </ModalDialog>
        </div>
      </CodePreview>

      {/* ── 4. Form Modal with Scrollable Body ── */}
      <CodePreview
        title="4. Form Modal & Ngăn click nhầm ra ngoài (preventCloseOnOverlayClick)"
        description="Sử dụng preventCloseOnOverlayClick và tính năng tự động cuộn (Scrollable) khi Form có nhiều trường thông tin."
        code={formUsageCode}
      >
        <div className="flex items-center gap-3">
          <Button onClick={() => setFormOpen(true)}>
            Mở Form Thêm Thành Viên
          </Button>

          <ModalDialog
            open={formOpen}
            onOpenChange={setFormOpen}
            title="Thêm thành viên mới"
            description="Nhập thông tin nhân sự để phân quyền truy cập vào dự án."
            confirmText="Tạo hồ sơ"
            size="lg"
            preventCloseOnOverlayClick
            onConfirm={() => {
              if (!userName.trim()) {
                toast.error('Vui lòng nhập họ và tên!');
                return;
              }
              toast.success(`Đã thêm thành viên ${userName} (${userRole})!`);
              setUserName('');
              setFormOpen(false);
            }}
          >
            <div className="space-y-4 py-1">
              <div>
                <label className="text-caption-1-sb text-foreground mb-1.5 block">
                  Họ và tên *
                </label>
                <InputGlobal
                  placeholder="Ví dụ: Nguyễn Văn A"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>

              <div>
                <label className="text-caption-1-sb text-foreground mb-1.5 block">
                  Vai trò trong hệ thống
                </label>
                <Select value={userRole} onValueChange={setUserRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn vai trò" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Quản trị viên (Admin)</SelectItem>
                    <SelectItem value="developer">
                      Lập trình viên (Developer)
                    </SelectItem>
                    <SelectItem value="designer">
                      Thiết kế UI/UX (Designer)
                    </SelectItem>
                    <SelectItem value="viewer">Chỉ xem (Viewer)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-lg border border-border bg-muted/20 p-3 space-y-1">
                <p className="text-caption-1-sb text-foreground">
                  Quyền hạn áp dụng
                </p>
                <p className="text-caption-2-rg text-muted-foreground">
                  Thành viên sẽ nhận được email kích hoạt kèm hướng dẫn đăng
                  nhập lần đầu.
                </p>
              </div>
            </div>
          </ModalDialog>
        </div>
      </CodePreview>

      {/* ── 5. Size Matrix ── */}
      <CodePreview
        title="5. Các kích thước có sẵn (Size Matrix)"
        description="Hỗ trợ 6 kích thước tiêu chuẩn: sm (448px), md (512px), lg (672px), xl (896px), 2xl (1152px), full."
        code={sizeUsageCode}
      >
        <div className="flex flex-wrap items-center gap-3">
          {(['sm', 'md', 'lg', 'xl', '2xl', 'full'] as ModalDialogSize[]).map(
            (size) => (
              <Button
                key={size}
                variant="outline"
                onClick={() => {
                  setSelectedSize(size);
                  setSizeOpen(true);
                }}
              >
                Xem Size:{' '}
                <span className="font-mono uppercase font-bold text-primary ml-1">
                  {size}
                </span>
              </Button>
            ),
          )}

          <ModalDialog
            open={sizeOpen}
            onOpenChange={setSizeOpen}
            size={selectedSize}
            title={`Hộp thoại kích thước: ${selectedSize.toUpperCase()}`}
            description={`Kích thước hiển thị phù hợp với các loại nội dung từ thông báo đến bảng dữ liệu lớn.`}
            confirmText="Đồng ý"
          >
            <div className="rounded-lg border border-dashed border-border bg-muted/20 p-6 text-center text-body-2-md text-muted-foreground">
              Vùng nội dung bên trong kích thước{' '}
              <strong className="text-foreground">{selectedSize}</strong>.
            </div>
          </ModalDialog>
        </div>
      </CodePreview>

      {/* ── 6. Custom Header & Footer ── */}
      <CodePreview
        title="6. Tùy biến Header & Footer (renderHeader, renderFooter)"
        description="Linh hoạt thay thế hoàn toàn Header hoặc Footer bằng component tùy chỉnh khi cần thiết kế đặc biệt."
        code={customUsageCode}
      >
        <div>
          <Button variant="secondPrimary" onClick={() => setCustomOpen(true)}>
            Mở Modal Custom Header/Footer
          </Button>

          <ModalDialog
            size="lg"
            open={customOpen}
            onOpenChange={setCustomOpen}
            renderHeader={({ onClose }) => (
              <div className="flex items-center justify-between border-b border-primary-700 bg-primary px-6 py-4 text-primary-foreground">
                <div className="flex items-center gap-2.5">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-white/20">
                    <TickCircle
                      size={20}
                      variant="Bold"
                      className="text-white"
                    />
                  </div>
                  <div>
                    <h3 className="text-title-2 font-bold text-white">
                      Thành tích mới mở khóa!
                    </h3>
                    <p className="text-caption-1-rg text-white/80">
                      Bạn vừa nhận được chứng nhận mới
                    </p>
                  </div>
                </div>
                <IconButton
                  size="small"
                  shape="circle"
                  icon={
                    <Icon
                      icon={X}
                      className="text-primary-200 hover:text-primary-600"
                    />
                  }
                  variant="text"
                  onClick={onClose}
                  className="cursor-pointer"
                />
              </div>
            )}
            renderFooter={({ onCancel }) => (
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-1.5 text-caption-1-rg text-muted-foreground">
                  <span>Hạn nhận:</span>
                  <strong className="text-foreground font-medium">
                    30 ngày
                  </strong>
                </div>
                <div className="flex items-center gap-2.5">
                  <Button variant="ghost" size="medium" onClick={onCancel}>
                    Để sau
                  </Button>
                  <Button variant="default" size="medium" onClick={onCancel}>
                    Nhận thưởng ngay
                  </Button>
                </div>
              </div>
            )}
          >
            <div className="space-y-3 py-4 text-center">
              <div className="text-5xl animate-bounce">🎉</div>
              <p className="text-title-2 font-bold text-foreground">
                Chúc mừng bạn đã hoàn thành khóa học!
              </p>
              <p className="text-body-2-rg text-muted-foreground max-w-sm mx-auto">
                Bạn đã hoàn thành xuất sắc tất cả các bài kiểm tra thực hành với
                điểm số tối đa.
              </p>
            </div>
          </ModalDialog>
        </div>
      </CodePreview>
    </div>
  );
};

export default ModalDialogDevPage;
