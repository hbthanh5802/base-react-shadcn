import { DevBreadcrumb } from '@/pages/dev/_DevBreadcrumb';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { CodePreview } from '@/shared/components/ui/code-block';

const cardUsageCode = `import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';

export function CardExample() {
  return (
    <Card variant="default">
      <CardHeader>
        <CardTitle>Tiêu đề thẻ</CardTitle>
        <CardDescription>Mô tả chi tiết nội dung của thẻ</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Nội dung chính hiển thị bên trong thẻ dữ liệu.</p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="outline" size="small">Hủy</Button>
        <Button size="small">Xác nhận</Button>
      </CardFooter>
    </Card>
  );
}`;

export const CardDevPage = () => (
  <div className="min-h-screen w-full space-y-8 bg-background p-6">
    <DevBreadcrumb label="Card" />
    <div className="space-y-1">
      <h1 className="text-heading-3 font-bold text-foreground">Card</h1>
      <p className="text-body-1-rg text-muted-foreground">
        Thẻ chứa thông tin nội dung với 3 biến thể hiển thị: Default, Filled và Elevated.
      </p>
    </div>

    {/* ── 1. Variants ── */}
    <CodePreview
      title="1. Các biến thể (Variants)"
      description="Thẻ viền tiêu chuẩn, thẻ nền đầy (filled) và thẻ nổi (elevated)."
      code={cardUsageCode}
    >
      <div className="grid gap-4 md:grid-cols-3">
        <Card variant="default">
          <CardHeader>
            <CardTitle>Default Card</CardTitle>
            <CardDescription>Viền border + shadow nhẹ trên nền card.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-body-2-rg text-muted-foreground">Nội dung thẻ mặc định phù hợp cho các khối dữ liệu thông thường.</p>
          </CardContent>
          <CardFooter className="gap-2 pt-3 border-t border-border">
            <Button variant="outline" size="small">Huỷ</Button>
            <Button size="small">Xác nhận</Button>
          </CardFooter>
        </Card>

        <Card variant="filled">
          <CardHeader>
            <CardTitle>Filled Card</CardTitle>
            <CardDescription>Nền muted/gray nhẹ nhàng, không viền.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-body-2-rg text-muted-foreground">Nội dung thẻ filled dùng để nhóm các thông tin phụ trợ.</p>
          </CardContent>
          <CardFooter className="gap-2 pt-3 border-t border-border/40">
            <Button variant="outline" size="small">Huỷ</Button>
            <Button size="small">Xác nhận</Button>
          </CardFooter>
        </Card>

        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Elevated Card</CardTitle>
            <CardDescription>Đổ bóng nổi bật, thu hút sự chú ý.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-body-2-rg text-muted-foreground">Thẻ elevated thích hợp cho dashboard KPI hoặc thẻ tương tác.</p>
          </CardContent>
          <CardFooter className="gap-2 pt-3 border-t border-border">
            <Button variant="outline" size="small">Huỷ</Button>
            <Button size="small">Xác nhận</Button>
          </CardFooter>
        </Card>
      </div>
    </CodePreview>

    {/* ── 2. Header Only ── */}
    <section className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-xs">
      <div className="border-b border-border pb-3">
        <h2 className="text-title-1 font-semibold text-foreground">2. Thẻ tiêu đề rút gọn (Header Only)</h2>
        <p className="text-body-2-rg text-muted-foreground mt-0.5">Dùng làm tiêu đề nhóm hoặc widget tóm tắt.</p>
      </div>
      <div className="grid gap-4 pt-2 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Tiêu đề thẻ</CardTitle>
            <CardDescription>Mô tả ngắn gọn về nội dung thẻ này.</CardDescription>
          </CardHeader>
        </Card>
        <Card variant="filled">
          <CardHeader>
            <CardTitle>Thống kê hồ sơ</CardTitle>
            <CardDescription>Tổng hợp dữ liệu số lượng theo tháng.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </section>
  </div>
);

export default CardDevPage;
