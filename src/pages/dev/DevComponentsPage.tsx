import { Link } from 'react-router-dom';

const cardClass =
  'group rounded-xl border border-border bg-card p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-primary-400 hover:shadow-md';

export const DevComponentsPage = () => {
  return (
    <div className="min-h-screen w-full space-y-8 bg-background p-6">
      <div className="space-y-1">
        <h1 className="text-heading-3 font-bold text-foreground">Dev Hub</h1>
        <p className="text-body-1-rg text-muted-foreground">
          Thư viện tổng hợp toàn bộ UI Components, Form, Bảng dữ liệu và Trang hệ thống trong dự án.
        </p>
      </div>

      {/* Trang hệ thống & Error Pages */}
      <section className="space-y-4">
        <h2 className="text-title-1 font-semibold text-foreground">Trang Hệ Thống & Error Pages</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link to="/404" className={cardClass}>
            <h3 className="text-title-2 font-semibold text-foreground group-hover:text-primary transition-colors">404 Not Found</h3>
            <p className="text-body-2-rg text-muted-foreground mt-1">
              Trang thông báo không tìm thấy đường dẫn hoặc tài nguyên.
            </p>
          </Link>

          <Link to="/403" className={cardClass}>
            <h3 className="text-title-2 font-semibold text-foreground group-hover:text-primary transition-colors">403 Forbidden</h3>
            <p className="text-body-2-rg text-muted-foreground mt-1">
              Trang thông báo từ chối truy cập do không đủ quyền hạn.
            </p>
          </Link>

          <Link to="/login" className={cardClass}>
            <h3 className="text-title-2 font-semibold text-foreground group-hover:text-primary transition-colors">Đăng nhập (Login)</h3>
            <p className="text-body-2-rg text-muted-foreground mt-1">
              Giao diện đăng nhập xác thực tài khoản.
            </p>
          </Link>

          <Link to="/home" className={cardClass}>
            <h3 className="text-title-2 font-semibold text-foreground group-hover:text-primary transition-colors">HomePage</h3>
            <p className="text-body-2-rg text-muted-foreground mt-1">
              Giao diện ứng dụng tiêu chuẩn không có sidebar.
            </p>
          </Link>

          <Link to="/dashboard" className={cardClass}>
            <h3 className="text-title-2 font-semibold text-foreground group-hover:text-primary transition-colors">Portal Dashboard</h3>
            <p className="text-body-2-rg text-muted-foreground mt-1">
              Trang cổng thông tin lựa chọn không gian làm việc.
            </p>
          </Link>
        </div>
      </section>

      {/* Components */}
      <section className="space-y-4">
        <h2 className="text-title-1 font-semibold text-foreground">UI Components</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link to="/dev/button" className={cardClass}>
            <h3 className="text-title-2 font-semibold text-foreground group-hover:text-primary transition-colors">Button & IconButton</h3>
            <p className="text-body-2-rg text-muted-foreground mt-1">Nút bấm chính, phụ, outline, ghost và icon button.</p>
          </Link>

          <Link to="/dev/form" className={cardClass}>
            <h3 className="text-title-2 font-semibold text-foreground group-hover:text-primary transition-colors">Form System</h3>
            <p className="text-body-2-rg text-muted-foreground mt-1">Hệ thống form tích hợp React Hook Form và xác thực Zod schema.</p>
          </Link>

          <Link to="/dev/text-field" className={cardClass}>
            <h3 className="text-title-2 font-semibold text-foreground group-hover:text-primary transition-colors">Text Field</h3>
            <p className="text-body-2-rg text-muted-foreground mt-1">Trường nhập dữ liệu kèm nhãn, mô tả, tags và validation.</p>
          </Link>

          <Link to="/dev/input" className={cardClass}>
            <h3 className="text-title-2 font-semibold text-foreground group-hover:text-primary transition-colors">Input</h3>
            <p className="text-body-2-rg text-muted-foreground mt-1">Ô nhập liệu cơ bản với đầy đủ kích thước và trạng thái.</p>
          </Link>

          <Link to="/dev/textarea" className={cardClass}>
            <h3 className="text-title-2 font-semibold text-foreground group-hover:text-primary transition-colors">Textarea</h3>
            <p className="text-body-2-rg text-muted-foreground mt-1">Vùng nhập văn bản nhiều dòng kèm giới hạn ký tự.</p>
          </Link>

          <Link to="/dev/select" className={cardClass}>
            <h3 className="text-title-2 font-semibold text-foreground group-hover:text-primary transition-colors">Select</h3>
            <p className="text-body-2-rg text-muted-foreground mt-1">Menu chọn giá trị đơn hoặc nhiều giá trị mượt mà.</p>
          </Link>

          <Link to="/dev/dropdown-menu" className={cardClass}>
            <h3 className="text-title-2 font-semibold text-foreground group-hover:text-primary transition-colors">Dropdown Menu</h3>
            <p className="text-body-2-rg text-muted-foreground mt-1">Menu ngữ cảnh, thao tác hàng loạt và tùy chọn nhanh.</p>
          </Link>

          <Link to="/dev/checkbox" className={cardClass}>
            <h3 className="text-title-2 font-semibold text-foreground group-hover:text-primary transition-colors">Checkbox</h3>
            <p className="text-body-2-rg text-muted-foreground mt-1">Hộp kiểm đơn và nhóm chọn nhiều giá trị.</p>
          </Link>

          <Link to="/dev/radio-button" className={cardClass}>
            <h3 className="text-title-2 font-semibold text-foreground group-hover:text-primary transition-colors">Radio Button</h3>
            <p className="text-body-2-rg text-muted-foreground mt-1">Nút chọn một giá trị duy nhất trong nhóm tùy chọn.</p>
          </Link>

          <Link to="/dev/switch" className={cardClass}>
            <h3 className="text-title-2 font-semibold text-foreground group-hover:text-primary transition-colors">Switch</h3>
            <p className="text-body-2-rg text-muted-foreground mt-1">Công tắc chuyển đổi trạng thái Bật / Tắt tức thì.</p>
          </Link>

          <Link to="/dev/chip" className={cardClass}>
            <h3 className="text-title-2 font-semibold text-foreground group-hover:text-primary transition-colors">Chip</h3>
            <p className="text-body-2-rg text-muted-foreground mt-1">Thẻ lọc, từ khóa và nhãn trạng thái có thể xóa.</p>
          </Link>

          <Link to="/dev/date-picker" className={cardClass}>
            <h3 className="text-title-2 font-semibold text-foreground group-hover:text-primary transition-colors">Date Picker</h3>
            <p className="text-body-2-rg text-muted-foreground mt-1">Bộ chọn ngày đơn, khoảng ngày, tháng, quý và năm.</p>
          </Link>

          <Link to="/dev/tanstack-table" className={cardClass}>
            <h3 className="text-title-2 font-semibold text-foreground group-hover:text-primary transition-colors">TanStack Table</h3>
            <p className="text-body-2-rg text-muted-foreground mt-1">Bảng dữ liệu hiệu năng cao: sắp xếp, lọc, phân trang và chọn dòng.</p>
          </Link>

          <Link to="/dev/pagination" className={cardClass}>
            <h3 className="text-title-2 font-semibold text-foreground group-hover:text-primary transition-colors">Pagination</h3>
            <p className="text-body-2-rg text-muted-foreground mt-1">Điều hướng phân trang đầy đủ hoặc rút gọn.</p>
          </Link>

          <Link to="/dev/breadcrumb" className={cardClass}>
            <h3 className="text-title-2 font-semibold text-foreground group-hover:text-primary transition-colors">Breadcrumb</h3>
            <p className="text-body-2-rg text-muted-foreground mt-1">Thanh điều hướng phân cấp đường dẫn trang.</p>
          </Link>

          <Link to="/dev/tabs" className={cardClass}>
            <h3 className="text-title-2 font-semibold text-foreground group-hover:text-primary transition-colors">Tabs</h3>
            <p className="text-body-2-rg text-muted-foreground mt-1">Tab chuyển đổi nội dung dạng underline hoặc contained.</p>
          </Link>

          <Link to="/dev/stepper" className={cardClass}>
            <h3 className="text-title-2 font-semibold text-foreground group-hover:text-primary transition-colors">Stepper</h3>
            <p className="text-body-2-rg text-muted-foreground mt-1">Thanh chỉ báo các bước thực hiện quy trình nghiệp vụ.</p>
          </Link>

          <Link to="/dev/dialog" className={cardClass}>
            <h3 className="text-title-2 font-semibold text-foreground group-hover:text-primary transition-colors">Dialog & Modal</h3>
            <p className="text-body-2-rg text-muted-foreground mt-1">Hộp thoại xác nhận, popup biểu mẫu và cảnh báo.</p>
          </Link>

          <Link to="/dev/card" className={cardClass}>
            <h3 className="text-title-2 font-semibold text-foreground group-hover:text-primary transition-colors">Card</h3>
            <p className="text-body-2-rg text-muted-foreground mt-1">Khung chứa nội dung thông tin với nhiều biến thể đổ bóng.</p>
          </Link>

          <Link to="/dev/notification" className={cardClass}>
            <h3 className="text-title-2 font-semibold text-foreground group-hover:text-primary transition-colors">Notification / Toast</h3>
            <p className="text-body-2-rg text-muted-foreground mt-1">Thông báo nổi góc màn hình: info, success, warning, error.</p>
          </Link>

          <Link to="/dev/tooltip" className={cardClass}>
            <h3 className="text-title-2 font-semibold text-foreground group-hover:text-primary transition-colors">Tooltip</h3>
            <p className="text-body-2-rg text-muted-foreground mt-1">Bong bóng gợi ý thông tin khi rê chuột hoặc focus.</p>
          </Link>

          <Link to="/dev/avatar" className={cardClass}>
            <h3 className="text-title-2 font-semibold text-foreground group-hover:text-primary transition-colors">Avatar</h3>
            <p className="text-body-2-rg text-muted-foreground mt-1">Ảnh đại diện người dùng, chỉ báo online/offline và nhóm avatar.</p>
          </Link>

          <Link to="/dev/badge" className={cardClass}>
            <h3 className="text-title-2 font-semibold text-foreground group-hover:text-primary transition-colors">Badge</h3>
            <p className="text-body-2-rg text-muted-foreground mt-1">Huy hiệu trạng thái dạng filled, light, outline và dot.</p>
          </Link>

          <Link to="/dev/chart" className={cardClass}>
            <h3 className="text-title-2 font-semibold text-foreground group-hover:text-primary transition-colors">Chart</h3>
            <p className="text-body-2-rg text-muted-foreground mt-1">Biểu đồ cột nhóm (BarChart) và biểu đồ tròn (DonutChart).</p>
          </Link>

          <Link to="/dev/document-viewer" className={cardClass}>
            <h3 className="text-title-2 font-semibold text-foreground group-hover:text-primary transition-colors">Document Viewer</h3>
            <p className="text-body-2-rg text-muted-foreground mt-1">Trình xem trước tài liệu PDF, Excel, Word, PPTX và CSV.</p>
          </Link>

          <Link to="/dev/empty-state" className={cardClass}>
            <h3 className="text-title-2 font-semibold text-foreground group-hover:text-primary transition-colors">Empty State</h3>
            <p className="text-body-2-rg text-muted-foreground mt-1">Giao diện hiển thị khi không có dữ liệu kèm hành động tạo mới.</p>
          </Link>

          <Link to="/dev/image" className={cardClass}>
            <h3 className="text-title-2 font-semibold text-foreground group-hover:text-primary transition-colors">Image</h3>
            <p className="text-body-2-rg text-muted-foreground mt-1">Hình ảnh tối ưu định dạng AVIF/WebP, lazy load và blur LQIP.</p>
          </Link>

          <Link to="/dev/icon" className={cardClass}>
            <h3 className="text-title-2 font-semibold text-foreground group-hover:text-primary transition-colors">Icon</h3>
            <p className="text-body-2-rg text-muted-foreground mt-1">Bộ sưu tập icon đồng bộ từ Iconsax và Lucide React.</p>
          </Link>

          <Link to="/dev/sidebar" className={cardClass}>
            <h3 className="text-title-2 font-semibold text-foreground group-hover:text-primary transition-colors">Sidebar</h3>
            <p className="text-body-2-rg text-muted-foreground mt-1">Thanh điều hướng phân cấp, tìm kiếm nhanh và lọc phân quyền.</p>
          </Link>

          <Link to="/dev/infinite-scroll" className={cardClass}>
            <h3 className="text-title-2 font-semibold text-foreground group-hover:text-primary transition-colors">Infinite Scroll</h3>
            <p className="text-body-2-rg text-muted-foreground mt-1">Tự động tải thêm dữ liệu khi cuộn đến cuối danh sách.</p>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default DevComponentsPage;
