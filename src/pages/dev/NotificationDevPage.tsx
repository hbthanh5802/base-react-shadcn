import { Flash, ShieldSecurity } from 'iconsax-react';
import React, { useState } from 'react';
import { toast as sonnerToast } from 'sonner';

import { DevBreadcrumb } from '@/pages/dev/_DevBreadcrumb';
import { Button } from '@/shared/components/ui/button';
import { CodePreview } from '@/shared/components/ui/code-block';
import { notify, Toast } from '@/shared/components/ui/toast';

const actionUsageCode = `import { notify } from '@/shared/components/ui/toast';

// 1. Action trên Colored Toast (Nút tự động hòa hợp theo tone màu của từng loại)
notify.success('Đã lưu bản nháp', {
  description: 'Bản sao lưu được tạo tự động lúc 14:30.',
  action: {
    label: 'Xem trước',
    onClick: () => notify.info('Mở màn hình xem trước bản nháp'),
  },
});

// 2. Action trên Plain Toast (Nền trắng tinh tế)
notify.plain.warning('Phiên đăng nhập sắp hết hạn', {
  description: 'Tài khoản của bạn sẽ tự động đăng xuất sau 5 phút.',
  action: {
    label: 'Gia hạn 60p',
    onClick: () => notify.plain.success('Đã gia hạn phiên làm việc!'),
  },
});

// 3. Action trên Solid Toast (Nền màu đậm + Nút trắng tương phản cao)
notify.solid.error('Xóa dự án thất bại', {
  description: 'Có tiến trình khác đang sử dụng tài nguyên này.',
  action: {
    label: 'Thử lại ngay',
    onClick: () => notify.solid.info('Đang thử kết nối lại...'),
  },
});`;

const promiseUsageCode = `import { notify } from '@/shared/components/ui/toast';

// Tự động chuyển trạng thái: Đang xử lý -> Thành công / Thất bại
notify.promise(
  // Mô phỏng hàm gọi API bất đồng bộ mất 2.2 giây
  new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() > 0.3 ? resolve({ id: 102 }) : reject(new Error('Lỗi máy chủ'));
    }, 2200);
  }),
  {
    loading: 'Đang sao lưu cơ sở dữ liệu lên đám mây...',
    success: 'Sao lưu thành công 4.8 GB dữ liệu!',
    error: 'Sao lưu thất bại, vui lòng thử lại sau.',
    description: 'Hệ thống tự động đồng bộ sang cụm máy chủ dự phòng.',
  }
);`;

const advancedPropsCode = `import { notify } from '@/shared/components/ui/toast';
import { ShieldSecurity, Flash } from 'iconsax-react';

// 1. Custom Icon (Tùy biến Icon trạng thái)
notify.info('Cập nhật bản vá bảo mật v3.0.2', {
  icon: <ShieldSecurity size={22} variant="Bold" className="text-primary" />,
  description: 'Tăng cường mã hóa dữ liệu đầu cuối AES-256.',
});

// 2. Persistent / Long Duration Toast (Thời gian tồn tại 10 giây)
notify.warning('Cảnh báo nhiệt độ máy chủ', {
  duration: 10000,
  description: 'Nhiệt độ CPU vượt ngưỡng 85°C. Vui lòng kiểm tra hệ thống làm mát.',
});`;

export const NotificationDevPage = () => {
  const [asyncRunning, setAsyncRunning] = useState(false);

  const triggerPromiseToast = () => {
    setAsyncRunning(true);
    notify.promise(
      new Promise((resolve, reject) => {
        setTimeout(() => {
          setAsyncRunning(false);
          Math.random() > 0.3 ? resolve({ success: true }) : reject(new Error('Lỗi mạng'));
        }, 2200);
      }),
      {
        loading: 'Đang tải lên và mã hóa tệp tin...',
        success: 'Tệp tin đã được tải lên và ký số an toàn!',
        error: 'Tải lên thất bại do mạng gián đoạn.',
        description: 'Dung lượng tệp: 24.5 MB • Giao thức: HTTPS / TLS 1.3',
      },
    );
  };

  return (
    <div className="min-h-screen w-full space-y-8 bg-background p-6">
      <DevBreadcrumb label="Notification" />
      <div className="space-y-1">
        <h1 className="text-heading-3 font-bold text-foreground">Notification / Toast</h1>
        <p className="text-body-1-rg text-muted-foreground">
          Hộp thông báo nổi hỗ trợ 3 phong cách giao diện (<strong>Colored</strong>, <strong>Plain / White</strong>, <strong>Solid</strong>), tích hợp nút hành động Action tự thích ứng với từng loại Toast.
        </p>
      </div>

      {/* ── 1. Appearance Variants Showcase ── */}
      <CodePreview
        title="1. Các phong cách giao diện (Colored, Plain / White, Solid)"
        description="Bấm để kích hoạt thông báo theo từng biến thể màu sắc."
        code={`// 1. Nền màu phân tầng (Colored - Mặc định)\nnotify.success('Thao tác thành công!');\n\n// 2. Nền trắng/card tối giản (Plain / White)\nnotify.plain.success('Thao tác thành công!');\n\n// 3. Nền màu đậm tương phản cao (Solid)\nnotify.solid.success('Thao tác thành công!');`}
      >
        <div className="space-y-4">
          {/* Row 1: Colored */}
          <div className="space-y-1.5">
            <span className="text-caption-1-sb text-muted-foreground uppercase font-mono">
              Colored / Tinted (Nền màu phân tầng nhẹ - Mặc định)
            </span>
            <div className="flex flex-wrap gap-2.5">
              <Button variant="secondPrimary" tone="green" size="small" onClick={() => notify.success('Lưu dữ liệu thành công!')}>
                Success Colored
              </Button>
              <Button variant="secondPrimary" tone="blue" size="small" onClick={() => notify.info('Thông tin: Hệ thống đang đồng bộ...')}>
                Info Colored
              </Button>
              <Button variant="secondPrimary" tone="yellow" size="small" onClick={() => notify.warning('Cảnh báo: Dung lượng sắp đầy!')}>
                Warning Colored
              </Button>
              <Button variant="secondPrimary" tone="primary" size="small" onClick={() => notify.error('Lỗi: Thao tác thất bại!')}>
                Error Colored
              </Button>
            </div>
          </div>

          {/* Row 2: Plain */}
          <div className="space-y-1.5">
            <span className="text-caption-1-sb text-muted-foreground uppercase font-mono">
              Plain / White Card (Nền trắng / thẻ trung tính)
            </span>
            <div className="flex flex-wrap gap-2.5">
              <Button variant="outlinePrimary" tone="green" size="small" onClick={() => notify.plain.success('Lưu dữ liệu thành công!')}>
                Success Plain (Trắng)
              </Button>
              <Button variant="outlinePrimary" tone="blue" size="small" onClick={() => notify.plain.info('Thông tin: Hệ thống đang đồng bộ...')}>
                Info Plain (Trắng)
              </Button>
              <Button variant="outlinePrimary" tone="yellow" size="small" onClick={() => notify.plain.warning('Cảnh báo: Dung lượng sắp đầy!')}>
                Warning Plain (Trắng)
              </Button>
              <Button variant="outlinePrimary" tone="primary" size="small" onClick={() => notify.plain.error('Lỗi: Thao tác thất bại!')}>
                Error Plain (Trắng)
              </Button>
            </div>
          </div>

          {/* Row 3: Solid */}
          <div className="space-y-1.5">
            <span className="text-caption-1-sb text-muted-foreground uppercase font-mono">
              Solid (Nền màu đậm - High Contrast)
            </span>
            <div className="flex flex-wrap gap-2.5">
              <Button tone="green" size="small" onClick={() => notify.solid.success('Lưu dữ liệu thành công!')}>
                Success Solid
              </Button>
              <Button tone="blue" size="small" onClick={() => notify.solid.info('Thông tin: Hệ thống đang đồng bộ...')}>
                Info Solid
              </Button>
              <Button tone="yellow" size="small" onClick={() => notify.solid.warning('Cảnh báo: Dung lượng sắp đầy!')}>
                Warning Solid
              </Button>
              <Button variant="destructive" size="small" onClick={() => notify.solid.error('Lỗi: Thao tác thất bại!')}>
                Error Solid
              </Button>
            </div>
          </div>
        </div>
      </CodePreview>

      {/* ── 2. Action Buttons ── */}
      <CodePreview
        title="2. Toast kèm nút hành động (Action Button & Undo)"
        description="Nút hành động được tự động phối màu chuẩn hóa theo loại thông báo (Info, Success, Warning, Error) và kiểu hiển thị (Colored, Plain, Solid)."
        code={actionUsageCode}
      >
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2.5">
            <Button
              variant="default"
              tone="green"
              size="small"
              onClick={() =>
                notify.success('Đã chuyển 1 hồ sơ vào thùng rác', {
                  description: 'Hồ sơ sẽ bị xóa vĩnh viễn sau 30 ngày.',
                  action: {
                    label: 'Hoàn tác (Undo)',
                    onClick: () => notify.info('Đã khôi phục hồ sơ thành công!'),
                  },
                })
              }
            >
              Colored Success + Action
            </Button>

            <Button
              variant="secondPrimary"
              tone="blue"
              size="small"
              onClick={() =>
                notify.plain.info('Đã tìm thấy bản cập nhật mới v2.4.0', {
                  description: 'Gói cài đặt có dung lượng 42 MB sẵn sàng tải về.',
                  action: {
                    label: 'Tải về ngay',
                    onClick: () => notify.plain.success('Đang bắt đầu tải xuống...'),
                  },
                })
              }
            >
              Plain Info + Action
            </Button>

            <Button
              variant="secondPrimary"
              tone="yellow"
              size="small"
              onClick={() =>
                notify.plain.warning('Phiên đăng nhập sắp hết hạn', {
                  description: 'Tài khoản sẽ tự động đăng xuất sau 5 phút.',
                  action: {
                    label: 'Gia hạn 60p',
                    onClick: () => notify.plain.success('Đã gia hạn phiên làm việc!'),
                  },
                })
              }
            >
              Plain Warning + Action
            </Button>

            <Button
              variant="destructive"
              size="small"
              onClick={() =>
                notify.solid.error('Xóa dự án thất bại', {
                  description: 'Có tiến trình khác đang sử dụng tài nguyên này.',
                  action: {
                    label: 'Thử lại ngay',
                    onClick: () => notify.solid.info('Đang thử kết nối lại...'),
                  },
                })
              }
            >
              Solid Error + Action
            </Button>

            <Button
              variant="default"
              tone="green"
              size="small"
              onClick={() =>
                notify.solid.success('Đã triển khai thành công lên Production', {
                  description: 'Phiên bản v2.5.0 hiện đã hoạt động ổn định 100%.',
                  action: {
                    label: 'Xem báo cáo',
                    onClick: () => notify.info('Mở trang báo cáo hệ thống'),
                  },
                })
              }
            >
              Solid Success + Action
            </Button>
          </div>
        </div>
      </CodePreview>

      {/* ── 3. Promise Auto-Transition ── */}
      <CodePreview
        title="3. Toast Bất đồng bộ (Promise Toast: Loading → Success/Error)"
        description="Tự động quản lý vòng đời tác vụ mạng: Hiển thị spinner khi tải và tự động cập nhật kết quả khi Promise hoàn tất."
        code={promiseUsageCode}
      >
        <div className="flex items-center gap-3">
          <Button disabled={asyncRunning} onClick={triggerPromiseToast}>
            {asyncRunning ? 'Đang thực hiện...' : 'Bắt đầu tác vụ Async (2.2s)'}
          </Button>
          <span className="text-body-2-rg text-muted-foreground">
            Bấm để mô phỏng tác vụ mạng bất đồng bộ có spinner xoay tròn tự chuyển trạng thái.
          </span>
        </div>
      </CodePreview>

      {/* ── 4. Custom Icon & Duration ── */}
      <CodePreview
        title="4. Tùy biến Icon (Custom Icon) & Thời gian tồn tại (Duration)"
        description="Cho phép ghi đè icon mặc định bằng bất kỳ icon thương hiệu nào và tùy chỉnh thời gian hiển thị."
        code={advancedPropsCode}
      >
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            onClick={() =>
              notify.info('Cập nhật bản vá bảo mật v3.0.2', {
                icon: <ShieldSecurity size={22} variant="Bold" className="text-primary" />,
                description: 'Tăng cường mã hóa dữ liệu đầu cuối AES-256.',
              })
            }
          >
            Custom Icon: Bảo mật
          </Button>

          <Button
            variant="outline"
            onClick={() =>
              notify.success('Kích hoạt chế độ Siêu tốc (Turbo Mode)', {
                icon: <Flash size={22} variant="Bold" className="text-amber-500" />,
                description: 'Hiệu năng xử lý đồ họa tăng 250%.',
              })
            }
          >
            Custom Icon: Tia sét (Flash)
          </Button>

          <Button
            variant="outline"
            onClick={() =>
              notify.warning('Thông báo giữ lâu (10 giây)', {
                duration: 10000,
                description: 'Toast này sẽ tồn tại trong 10 giây trước khi tự động ẩn.',
              })
            }
          >
            Toast thời gian 10s (Long Duration)
          </Button>

          <Button variant="ghost" onClick={() => notify.dismiss()}>
            Đóng tất cả Toast (Dismiss All)
          </Button>
        </div>
      </CodePreview>

      {/* ── 5. Design Preview Comparison ── */}
      <CodePreview
        title="5. So sánh trực quan các Biến thể (Design Preview Comparison)"
        description="Xem trước tĩnh 3 phong cách giao diện: Colored (Nền màu nhẹ), Plain (Nền trắng), Solid (Nền đậm)."
        code={`<Toast variant="success" appearance="colored" title="..." />\n<Toast variant="success" appearance="plain" title="..." />\n<Toast variant="success" appearance="solid" title="..." />`}
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Column 1: Colored */}
          <div className="space-y-3">
            <span className="text-body-2-sb text-primary block font-semibold">Colored (Nền màu phân tầng)</span>
            <Toast variant="info" appearance="colored" title="Thông tin hệ thống" description="Dữ liệu mẫu đã cập nhật." />
            <Toast variant="success" appearance="colored" title="Thao tác thành công" description="Hồ sơ đã được duyệt." />
            <Toast variant="warning" appearance="colored" title="Cảnh báo dữ liệu" description="Một số trường chưa điền." />
            <Toast variant="error" appearance="colored" title="Lỗi kết nối máy chủ" description="Không thể kết nối server." />
          </div>

          {/* Column 2: Plain (White) */}
          <div className="space-y-3">
            <span className="text-body-2-sb text-foreground block font-semibold">Plain (Nền trắng trung tính)</span>
            <Toast variant="info" appearance="plain" title="Thông tin hệ thống" description="Dữ liệu mẫu đã cập nhật." />
            <Toast variant="success" appearance="plain" title="Thao tác thành công" description="Hồ sơ đã được duyệt." />
            <Toast variant="warning" appearance="plain" title="Cảnh báo dữ liệu" description="Một số trường chưa điền." />
            <Toast variant="error" appearance="plain" title="Lỗi kết nối máy chủ" description="Không thể kết nối server." />
          </div>

          {/* Column 3: Solid */}
          <div className="space-y-3">
            <span className="text-body-2-sb text-foreground block font-semibold">Solid (Nền màu đậm)</span>
            <Toast variant="info" appearance="solid" title="Thông tin hệ thống" description="Dữ liệu mẫu đã cập nhật." />
            <Toast variant="success" appearance="solid" title="Thao tác thành công" description="Hồ sơ đã được duyệt." />
            <Toast variant="warning" appearance="solid" title="Cảnh báo dữ liệu" description="Một số trường chưa điền." />
            <Toast variant="error" appearance="solid" title="Lỗi kết nối máy chủ" description="Không thể kết nối server." />
          </div>
        </div>
      </CodePreview>
    </div>
  );
};

export default NotificationDevPage;
