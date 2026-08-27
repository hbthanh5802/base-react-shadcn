import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Filter, Settings, User } from 'lucide-react';
import { useState } from 'react';

import { DevBreadcrumb } from '@/pages/dev/_DevBreadcrumb';
import { Button } from '@/shared/components/ui/button';
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/components/ui/drawer';
import { InputGlobal } from '@/shared/components/ui/input-global';
import { Label } from '@/shared/components/ui/label';
import { Switch } from '@/shared/components/ui/switch';
import { TextField } from '@/shared/components/ui/text-field';

export const DrawerDevPage = () => {
  const [openRight, setOpenRight] = useState(false);
  const [openLeft, setOpenLeft] = useState(false);
  const [openBottom, setOpenBottom] = useState(false);
  const [openTop, setOpenTop] = useState(false);
  const [selectedSize, setSelectedSize] = useState<'sm' | 'md' | 'lg' | 'xl' | 'full'>('md');
  const [sizeDrawerOpen, setSizeDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen w-full space-y-8 bg-background p-6">
      <DevBreadcrumb label="Drawer (Slide-over Panel)" />
      <div className="space-y-1">
        <h1 className="text-heading-3 font-bold text-foreground">Drawer (Slide-over Panel)</h1>
        <p className="text-body-1-rg text-muted-foreground">
          Bảng trượt từ 4 hướng màn hình (Phải, Trái, Dưới, Trên) hỗ trợ form lọc, chi tiết đối tượng và cấu hình phụ.
        </p>
      </div>

      {/* ── 1. Directions ── */}
      <section className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-xs">
        <div className="border-b border-border pb-3">
          <h2 className="text-title-1 font-semibold text-foreground">1. Hướng trượt (4 Directions)</h2>
          <p className="text-body-2-rg text-muted-foreground mt-0.5">
            Trượt từ Phải (Mặc định), Trái (Menu/Sidebar), Dưới (Bottom Sheet), Trên (Search/Banner).
          </p>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          {/* Right Drawer */}
          <Drawer open={openRight} onOpenChange={setOpenRight}>
            <DrawerTrigger asChild>
              <Button iconLayout="left">
                <ArrowRight className="h-4 w-4" />
                Trượt từ Phải (Right - Mặc định)
              </Button>
            </DrawerTrigger>
            <DrawerContent side="right" size="md">
              <DrawerHeader>
                <DrawerTitle>Thông tin chi tiết</DrawerTitle>
                <DrawerDescription>Chỉnh sửa thông tin người dùng và quyền hạn.</DrawerDescription>
              </DrawerHeader>
              <DrawerBody className="space-y-4">
                <TextField label="Họ và tên" defaultValue="Nguyễn Văn A" required />
                <TextField label="Email" defaultValue="nguyenvana@example.com" type="email" required />
                <TextField label="Số điện thoại" defaultValue="0912 345 678" />
                <div className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div className="space-y-0.5">
                    <Label className="text-body-2-sb">Kích hoạt tài khoản</Label>
                    <p className="text-body-3-rg text-muted-foreground">Cho phép đăng nhập vào hệ thống</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </DrawerBody>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline">Hủy</Button>
                </DrawerClose>
                <Button onClick={() => setOpenRight(false)}>Lưu thay đổi</Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          {/* Left Drawer */}
          <Drawer open={openLeft} onOpenChange={setOpenLeft}>
            <DrawerTrigger asChild>
              <Button variant="secondary" iconLayout="left">
                <ArrowLeft className="h-4 w-4" />
                Trượt từ Trái (Left)
              </Button>
            </DrawerTrigger>
            <DrawerContent side="left" size="sm">
              <DrawerHeader>
                <DrawerTitle>Menu điều hướng</DrawerTitle>
                <DrawerDescription>Danh mục các tính năng chính</DrawerDescription>
              </DrawerHeader>
              <DrawerBody className="space-y-2">
                <Button variant="ghost" className="w-full justify-start" iconLayout="left">
                  <User className="h-4 w-4" />
                  Hồ sơ cá nhân
                </Button>
                <Button variant="ghost" className="w-full justify-start" iconLayout="left">
                  <Settings className="h-4 w-4" />
                  Cài đặt hệ thống
                </Button>
              </DrawerBody>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline" className="w-full">Đóng</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          {/* Bottom Drawer */}
          <Drawer open={openBottom} onOpenChange={setOpenBottom}>
            <DrawerTrigger asChild>
              <Button variant="outline" iconLayout="left">
                <ArrowDown className="h-4 w-4" />
                Trượt từ Dưới (Bottom Sheet)
              </Button>
            </DrawerTrigger>
            <DrawerContent side="bottom" size="md">
              <DrawerHeader>
                <DrawerTitle>Hành động nhanh</DrawerTitle>
                <DrawerDescription>Chọn thao tác bạn muốn thực hiện</DrawerDescription>
              </DrawerHeader>
              <DrawerBody className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-xl border border-border p-4 text-center hover:bg-muted/50 cursor-pointer transition-colors">
                  <p className="font-semibold text-foreground">Xuất dữ liệu</p>
                  <p className="text-body-3-rg text-muted-foreground mt-1">Xuất file Excel báo cáo</p>
                </div>
                <div className="rounded-xl border border-border p-4 text-center hover:bg-muted/50 cursor-pointer transition-colors">
                  <p className="font-semibold text-foreground">Gửi thông báo</p>
                  <p className="text-body-3-rg text-muted-foreground mt-1">Gửi email hàng loạt</p>
                </div>
                <div className="rounded-xl border border-border p-4 text-center hover:bg-muted/50 cursor-pointer transition-colors">
                  <p className="font-semibold text-foreground">Phân quyền</p>
                  <p className="text-body-3-rg text-muted-foreground mt-1">Cập nhật nhóm quyền</p>
                </div>
              </DrawerBody>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline">Đóng</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          {/* Top Drawer */}
          <Drawer open={openTop} onOpenChange={setOpenTop}>
            <DrawerTrigger asChild>
              <Button variant="ghost" iconLayout="left">
                <ArrowUp className="h-4 w-4" />
                Trượt từ Trên (Top)
              </Button>
            </DrawerTrigger>
            <DrawerContent side="top" size="sm">
              <DrawerHeader>
                <DrawerTitle>Tìm kiếm nhanh</DrawerTitle>
                <DrawerDescription>Nhập từ khóa để tìm kiếm trên toàn hệ thống</DrawerDescription>
              </DrawerHeader>
              <DrawerBody>
                <InputGlobal placeholder="Tìm kiếm tài liệu, hợp đồng, người dùng..." />
              </DrawerBody>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline">Đóng</Button>
                </DrawerClose>
                <Button>Tìm kiếm</Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </section>

      {/* ── 2. Size Variants ── */}
      <section className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-xs">
        <div className="border-b border-border pb-3">
          <h2 className="text-title-1 font-semibold text-foreground">2. Các kích thước (Size Variants)</h2>
          <p className="text-body-2-rg text-muted-foreground mt-0.5">
            Lựa chọn độ rộng phù hợp: Small (320px), Medium (480px), Large (640px), Extra Large (768px), Fullscreen (100vw).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          {(['sm', 'md', 'lg', 'xl', 'full'] as const).map((s) => (
            <Button
              key={s}
              variant={selectedSize === s ? 'default' : 'outline'}
              onClick={() => {
                setSelectedSize(s);
                setSizeDrawerOpen(true);
              }}
            >
              Size: {s.toUpperCase()}
            </Button>
          ))}

          <Drawer open={sizeDrawerOpen} onOpenChange={setSizeDrawerOpen}>
            <DrawerContent side="right" size={selectedSize}>
              <DrawerHeader>
                <DrawerTitle>Drawer Size: {selectedSize.toUpperCase()}</DrawerTitle>
                <DrawerDescription>Đang xem hiển thị với kích thước {selectedSize}.</DrawerDescription>
              </DrawerHeader>
              <DrawerBody className="space-y-4">
                <p className="text-muted-foreground">
                  Nội dung tự động co dãn theo kích thước của Drawer, đảm bảo các phần tử form và dữ liệu được trình bày trực quan và dễ thao tác nhất.
                </p>
                <div className="rounded-lg border border-border bg-muted/30 p-4">
                  <p className="font-medium text-foreground">Thông số kỹ thuật:</p>
                  <ul className="mt-2 list-inside list-disc text-body-2-rg text-muted-foreground space-y-1">
                    <li>Size sm: 320px</li>
                    <li>Size md: 480px (tiêu chuẩn)</li>
                    <li>Size lg: 640px</li>
                    <li>Size xl: 768px</li>
                    <li>Size full: 100vw</li>
                  </ul>
                </div>
              </DrawerBody>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline">Đóng</Button>
                </DrawerClose>
                <Button onClick={() => setSizeDrawerOpen(false)}>Hoàn tất</Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </section>

      {/* ── 3. Filter Drawer Demo ── */}
      <section className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-xs">
        <div className="border-b border-border pb-3">
          <h2 className="text-title-1 font-semibold text-foreground">3. Ứng dụng thực tế: Bộ lọc nâng cao (Filter Drawer)</h2>
          <p className="text-body-2-rg text-muted-foreground mt-0.5">
            Mẫu ứng dụng bộ lọc trượt từ cạnh phải phổ biến trong các trang quản lý bảng dữ liệu.
          </p>
        </div>

        <div className="pt-2">
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline" iconLayout="left">
                <Filter className="h-4 w-4" />
                Mở bộ lọc nâng cao
              </Button>
            </DrawerTrigger>
            <DrawerContent side="right" size="md">
              <DrawerHeader>
                <DrawerTitle>Bộ lọc tìm kiếm</DrawerTitle>
                <DrawerDescription>Tùy chỉnh tiêu chí để thu hẹp kết quả dữ liệu.</DrawerDescription>
              </DrawerHeader>
              <DrawerBody className="space-y-4">
                <TextField label="Mã giao dịch / Từ khóa" placeholder="Nhập từ khóa..." />
                <TextField label="Người thực hiện" placeholder="Nhập tên nhân viên..." />
                <div className="space-y-2">
                  <Label className="text-body-2-sb">Trạng thái phê duyệt</Label>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="status-1" className="h-4 w-4 accent-primary rounded" defaultChecked />
                      <label htmlFor="status-1" className="text-body-2-rg text-foreground cursor-pointer">Đã phê duyệt</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="status-2" className="h-4 w-4 accent-primary rounded" defaultChecked />
                      <label htmlFor="status-2" className="text-body-2-rg text-foreground cursor-pointer">Chờ xử lý</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="status-3" className="h-4 w-4 accent-primary rounded" />
                      <label htmlFor="status-3" className="text-body-2-rg text-foreground cursor-pointer">Đã từ chối</label>
                    </div>
                  </div>
                </div>
              </DrawerBody>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline">Đặt lại</Button>
                </DrawerClose>
                <DrawerClose asChild>
                  <Button>Áp dụng bộ lọc</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </section>
    </div>
  );
};

export default DrawerDevPage;
