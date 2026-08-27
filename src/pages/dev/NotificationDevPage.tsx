import { toast } from 'sonner';

import { DevBreadcrumb } from '@/pages/dev/_DevBreadcrumb';
import { Button } from '@/shared/components/ui/button';
import { CodePreview } from '@/shared/components/ui/code-block';
import { Toast } from '@/shared/components/ui/toast';

const toastUsageCode = `import { toast } from 'sonner';

// 1. Thông báo thành công (Success)
toast.success('Lưu dữ liệu thành công!');

// 2. Thông báo thông tin (Info)
toast.info('Thông tin: Hệ thống đang đồng bộ...');

// 3. Thông báo cảnh báo (Warning)
toast.warning('Cảnh báo: Dung lượng sắp đầy!');

// 4. Thông báo lỗi (Error)
toast.error('Lỗi: Thao tác thất bại!');

// 5. Toast có tiêu đề và mô tả
toast.error('Lỗi kết nối máy chủ dịch vụ', {
  description: 'Hệ thống không thể kết nối tới server sau 3000ms.',
});`;

export const NotificationDevPage = () => {
  const showLongToast = () => {
    toast.info(
      'Hệ thống đã nhận được yêu cầu xử lý hồ sơ. Thời gian dự kiến hoàn thành là trong vòng 24h làm việc. Vui lòng kiểm tra email để biết thêm chi tiết.',
    );
  };

  const showLongTitleDescriptionToast = () => {
    toast.error('Lỗi kết nối máy chủ dịch vụ', {
      description:
        'Hệ thống không thể kết nối tới server sau 3000ms. Vui lòng kiểm tra lại kết nối mạng internet hoặc liên hệ quản trị viên.',
    });
  };

  return (
    <div className="min-h-screen w-full space-y-8 bg-background p-6">
      <DevBreadcrumb label="Notification" />
      <div className="space-y-1">
        <h1 className="text-heading-3 font-bold text-foreground">Notification / Toast</h1>
        <p className="text-body-1-rg text-muted-foreground">
          Hộp thông báo nổi phản hồi kết quả thao tác: Info, Success, Warning và Error.
        </p>
      </div>

      {/* ── 1. Interactive Toast ── */}
      <CodePreview
        title="1. Kích hoạt thông báo thực tế (Interactive Toast)"
        description="Click các nút bên dưới để xem Toast xuất hiện ở góc màn hình."
        code={toastUsageCode}
      >
        <div className="flex flex-wrap gap-3">
          <Button variant="default" onClick={() => toast.success('Lưu dữ liệu thành công!')}>
            Success Toast
          </Button>
          <Button variant="outline" onClick={() => toast.info('Thông tin: Hệ thống đang đồng bộ...')}>
            Info Toast
          </Button>
          <Button variant="outline" onClick={() => toast.warning('Cảnh báo: Dung lượng sắp đầy!')}>
            Warning Toast
          </Button>
          <Button variant="destructive" onClick={() => toast.error('Lỗi: Thao tác thất bại!')}>
            Error Toast
          </Button>
          <Button variant="outlinePrimary" onClick={showLongToast}>
            Nội dung dài (Tự động co giãn)
          </Button>
          <Button variant="outline" onClick={showLongTitleDescriptionToast}>
            Tiêu đề + Mô tả chi tiết
          </Button>
        </div>
      </CodePreview>

      {/* ── 2. Design Preview Section ── */}
      <section className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-xs">
        <div className="border-b border-border pb-3">
          <h2 className="text-title-1 font-semibold text-foreground">2. Xem trước mẫu giao diện Toast (Design Preview)</h2>
          <p className="text-body-2-rg text-muted-foreground mt-0.5">Các biến thể đồ họa chuẩn hóa theo hệ thống màu.</p>
        </div>
        <div className="flex flex-col gap-3 pt-2 max-w-xl">
          <Toast
            variant="info"
            title="Thông tin hệ thống"
            description="Dữ liệu mẫu đã được cập nhật phiên bản mới nhất."
          />
          <Toast
            variant="success"
            title="Thao tác thành công"
            description="Hồ sơ đã được phê duyệt và gửi thông báo tới các bên liên quan."
          />
          <Toast
            variant="warning"
            title="Cảnh báo dữ liệu"
            description="Một số trường dữ liệu chưa được điền đầy đủ."
          />
          <Toast
            variant="error"
            title="Lỗi kết nối máy chủ"
            description="Không thể kết nối đến máy chủ. Vui lòng thử lại sau."
          />
        </div>
      </section>
    </div>
  );
};

export default NotificationDevPage;
