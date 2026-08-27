import { DevBreadcrumb } from '@/pages/dev/_DevBreadcrumb';
import { CodePreview } from '@/shared/components/ui/code-block';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';

const sizes = ['sm', 'md'] as const;

const tabsUsageCode = `import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/shared/components/ui/tabs';

// 1. Giao diện gạch chân (Underline) kèm badge
<Tabs defaultValue="tab1">
  <TabsList variant="underline">
    <TabsTrigger variant="underline" value="tab1" badge={12}>Tổng quan</TabsTrigger>
    <TabsTrigger variant="underline" value="tab2" badge={3}>Cần xử lý</TabsTrigger>
    <TabsTrigger variant="underline" value="tab3">Lịch sử</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Nội dung Tổng quan</TabsContent>
  <TabsContent value="tab2">Nội dung Cần xử lý</TabsContent>
  <TabsContent value="tab3">Nội dung Lịch sử</TabsContent>
</Tabs>

// 2. Giao diện dạng khối (Contained)
<Tabs defaultValue="all">
  <TabsList variant="contained">
    <TabsTrigger variant="contained" value="all">Tất cả</TabsTrigger>
    <TabsTrigger variant="contained" value="pending">Chờ duyệt</TabsTrigger>
    <TabsTrigger variant="contained" value="done">Hoàn thành</TabsTrigger>
  </TabsList>
</Tabs>`;

export const TabsDevPage = () => (
  <div className="min-h-screen w-full space-y-8 bg-background p-6">
    <DevBreadcrumb label="Tabs" />
    <div className="space-y-1">
      <h1 className="text-heading-3 font-bold text-foreground">Tabs</h1>
      <p className="text-body-1-rg text-muted-foreground">
        Thành phần tab chuyển đổi nội dung hỗ trợ 3 kiểu dáng: Underline (gạch chân), Contained (khối) và Card (thư mục).
      </p>
    </div>

    {/* ── 1. Underline variant ── */}
    <CodePreview
      title="1. Giao diện gạch chân (Underline)"
      description="Kiểu dáng thanh lịch phù hợp cho các trang nội dung chính."
      code={tabsUsageCode}
    >
      <div className="space-y-6">
        {sizes.map((size) => (
          <div key={size} className="space-y-2">
            <p className="text-caption-1-sb text-muted-foreground uppercase">Kích thước: {size}</p>
            <Tabs defaultValue="tab1">
              <TabsList variant="underline">
                <TabsTrigger variant="underline" size={size} value="tab1">
                  Tổng quan
                </TabsTrigger>
                <TabsTrigger variant="underline" size={size} value="tab2">
                  Chi tiết hồ sơ
                </TabsTrigger>
                <TabsTrigger variant="underline" size={size} value="tab3">
                  Lịch sử xử lý
                </TabsTrigger>
                <TabsTrigger variant="underline" size={size} value="tab4" disabled>
                  Vô hiệu hóa
                </TabsTrigger>
              </TabsList>
              <TabsContent value="tab1" className="p-4 mt-2 rounded-lg bg-background border border-border">
                <p className="text-body-2-rg text-muted-foreground">Nội dung tab Tổng quan</p>
              </TabsContent>
              <TabsContent value="tab2" className="p-4 mt-2 rounded-lg bg-background border border-border">
                <p className="text-body-2-rg text-muted-foreground">Nội dung tab Chi tiết hồ sơ</p>
              </TabsContent>
              <TabsContent value="tab3" className="p-4 mt-2 rounded-lg bg-background border border-border">
                <p className="text-body-2-rg text-muted-foreground">Nội dung tab Lịch sử xử lý</p>
              </TabsContent>
            </Tabs>
          </div>
        ))}
      </div>
    </CodePreview>

    {/* ── 2. Contained variant ── */}
    <section className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-xs">
      <div className="border-b border-border pb-3">
        <h2 className="text-title-1 font-semibold text-foreground">2. Giao diện dạng khối (Contained / Button)</h2>
        <p className="text-body-2-rg text-muted-foreground mt-0.5">Phù hợp cho bộ lọc trạng thái danh sách.</p>
      </div>

      <div className="space-y-6 pt-2">
        {sizes.map((size) => (
          <div key={size} className="space-y-2">
            <p className="text-caption-1-sb text-muted-foreground uppercase">Kích thước: {size}</p>
            <Tabs defaultValue="tab1">
              <TabsList variant="contained">
                <TabsTrigger variant="contained" size={size} value="tab1">
                  Tất cả hồ sơ
                </TabsTrigger>
                <TabsTrigger variant="contained" size={size} value="tab2">
                  Đang thẩm định
                </TabsTrigger>
                <TabsTrigger variant="contained" size={size} value="tab3">
                  Đã hoàn thành
                </TabsTrigger>
              </TabsList>
              <TabsContent value="tab1" className="p-4 mt-2 rounded-lg bg-background border border-border">
                <p className="text-body-2-rg text-muted-foreground">Hiển thị toàn bộ danh sách hồ sơ</p>
              </TabsContent>
              <TabsContent value="tab2" className="p-4 mt-2 rounded-lg bg-background border border-border">
                <p className="text-body-2-rg text-muted-foreground">Danh sách hồ sơ đang trong quá trình thẩm định</p>
              </TabsContent>
              <TabsContent value="tab3" className="p-4 mt-2 rounded-lg bg-background border border-border">
                <p className="text-body-2-rg text-muted-foreground">Danh sách hồ sơ đã hoàn thành</p>
              </TabsContent>
            </Tabs>
          </div>
        ))}
      </div>
    </section>

    {/* ── 3. Badge variant ── */}
    <section className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-xs">
      <div className="border-b border-border pb-3">
        <h2 className="text-title-1 font-semibold text-foreground">3. Kèm huy hiệu số lượng (Badge Notification)</h2>
        <p className="text-body-2-rg text-muted-foreground mt-0.5">Chỉ báo số lượng bản ghi tương ứng trên từng tab.</p>
      </div>
      <div className="space-y-6 pt-2">
        <Tabs defaultValue="tab1">
          <TabsList variant="underline">
            <TabsTrigger variant="underline" value="tab1" badge={12}>
              Hộp thư đến
            </TabsTrigger>
            <TabsTrigger variant="underline" value="tab2" badge={3}>
              Cần xử lý gấp
            </TabsTrigger>
            <TabsTrigger variant="underline" value="tab3" badge={0}>
              Đã giải quyết
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Tabs defaultValue="tab1">
          <TabsList variant="contained">
            <TabsTrigger variant="contained" value="tab1" badge={24}>
              Tất cả
            </TabsTrigger>
            <TabsTrigger variant="contained" value="tab2" badge={5}>
              Chờ duyệt
            </TabsTrigger>
            <TabsTrigger variant="contained" value="tab3" badge={0}>
              Lưu trữ
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </section>
  </div>
);

export default TabsDevPage;
