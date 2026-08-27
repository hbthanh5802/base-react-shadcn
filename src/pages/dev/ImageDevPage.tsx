import { DevBreadcrumb } from '@/pages/dev/_DevBreadcrumb';
import { Image } from '@/shared/components/ui/image';

const PHOTO_BASE = 'https://picsum.photos/seed';

const Section = ({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) => (
  <section className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-xs">
    <div className="border-b border-border pb-3">
      <h2 className="text-title-1 font-semibold text-foreground">{title}</h2>
      {description && <p className="text-body-2-rg text-muted-foreground mt-0.5">{description}</p>}
    </div>
    {children}
  </section>
);

export const ImageDevPage = () => (
  <div className="min-h-screen w-full space-y-8 bg-background p-6">
    <DevBreadcrumb label="Image" />
    <div className="space-y-1">
      <h1 className="text-heading-3 font-bold text-foreground">Image</h1>
      <p className="text-body-1-rg text-muted-foreground">
        Thành phần hiển thị hình ảnh tối ưu: định dạng thế hệ mới (AVIF/WebP), hiệu ứng mờ dần (Blur-up LQIP) và fallback khi ảnh lỗi.
      </p>
    </div>

    {/* ─── 1. Format fallback (AVIF → WebP → JPEG) ─── */}
    <Section
      title="1. Dự phòng định dạng hiện đại (AVIF → WebP → JPEG)"
      description="Trình duyệt sẽ tự động chọn định dạng nén tối ưu nhất mà nó hỗ trợ."
    >
      <div className="pt-2">
        <Image
          src={`${PHOTO_BASE}/alpine/400/280`}
          webpSrc={`${PHOTO_BASE}/alpine/400/280`}
          avifSrc={`${PHOTO_BASE}/alpine/400/280`}
          alt="Format fallback example"
          width={400}
          height={280}
          className="rounded-lg border border-border"
        />
      </div>
    </Section>

    {/* ─── 2. Blur-up progressive loading ─── */}
    <Section
      title="2. Hiệu ứng làm mờ tăng dần (Blur-Up Progressive LQIP)"
      description="Hiển thị ảnh mờ dung lượng siêu nhỏ tức thì, sau đó chuyển dần sang ảnh chất lượng cao."
    >
      <div className="flex flex-wrap gap-6 pt-2">
        <div className="flex flex-col items-start gap-2">
          <Image
            src={`${PHOTO_BASE}/forest/600/400`}
            placeholder={`${PHOTO_BASE}/forest/20/14`}
            progressive
            alt="Blur-up forest"
            width={400}
            height={260}
            placeholderDuration={500}
            className="rounded-lg border border-border"
          />
          <span className="text-caption-1-rg text-muted-foreground">Thời gian chuyển cảnh: 500ms</span>
        </div>
      </div>
    </Section>

    {/* ─── 3. Skeleton loading state ─── */}
    <Section
      title="3. Hiệu ứng khung chờ tải (Skeleton Loading State)"
      description="Hiển thị khung sáng mờ khi ảnh đang được tải về từ máy chủ."
    >
      <div className="flex flex-wrap gap-4 pt-2">
        {[
          { w: 200, h: 150, seed: 'mountain' },
          { w: 200, h: 150, seed: 'sky' },
          { w: 200, h: 150, seed: 'river' },
        ].map(({ w, h, seed }) => (
          <Image
            key={seed}
            src={`${PHOTO_BASE}/${seed}/${w}/${h}`}
            alt={seed}
            width={w}
            height={h}
            className="rounded-lg border border-border object-cover"
          />
        ))}
      </div>
    </Section>

    {/* ─── 4. Fallback on error ─── */}
    <Section
      title="4. Xử lý khi ảnh bị lỗi (Error Fallback)"
      description="Tự động tải ảnh dự phòng khi đường dẫn ảnh chính thức không tồn tại."
    >
      <div className="flex flex-wrap gap-6 pt-2">
        <div className="flex flex-col items-center gap-1.5">
          <Image
            src="/link-anh-khong-ton-tai.jpg"
            fallbackSrc={`${PHOTO_BASE}/fallback/300/200`}
            alt="Broken with fallback"
            width={280}
            height={180}
            className="rounded-lg border border-border object-cover"
          />
          <span className="text-caption-1-rg text-muted-foreground">Link lỗi → Tự động hiện ảnh fallback</span>
        </div>
      </div>
    </Section>
  </div>
);

export default ImageDevPage;
