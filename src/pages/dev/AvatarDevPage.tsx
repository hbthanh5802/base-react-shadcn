import { DevBreadcrumb } from '@/pages/dev/_DevBreadcrumb';
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from '@/shared/components/ui/avatar';
import { CodePreview } from '@/shared/components/ui/code-block';

const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;
const statuses = ['online', 'away', 'busy', 'offline'] as const;

const avatarUsageCode = `import { Avatar, AvatarImage, AvatarFallback, AvatarGroup } from '@/shared/components/ui/avatar';

// 1. Avatar kèm ảnh và fallback
<Avatar size="lg" status="online">
  <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" alt="Avatar" />
  <AvatarFallback>TQ</AvatarFallback>
</Avatar>

// 2. Nhóm Avatar (Avatar Group)
<AvatarGroup size="md" max={4}>
  <Avatar><AvatarFallback>A</AvatarFallback></Avatar>
  <Avatar><AvatarFallback>B</AvatarFallback></Avatar>
  <Avatar><AvatarFallback>C</AvatarFallback></Avatar>
  <Avatar><AvatarFallback>D</AvatarFallback></Avatar>
  <Avatar><AvatarFallback>E</AvatarFallback></Avatar>
</AvatarGroup>`;

export const AvatarDevPage = () => (
  <div className="min-h-screen w-full space-y-8 bg-background p-6">
    <DevBreadcrumb label="Avatar" />
    <div className="space-y-1">
      <h1 className="text-heading-3 font-bold text-foreground">Avatar</h1>
      <p className="text-body-1-rg text-muted-foreground">
        Ảnh đại diện người dùng với nhiều kích thước, trạng thái hoạt động và nhóm avatar.
      </p>
    </div>

    {/* ── 1. Kích thước & Fallback ── */}
    <CodePreview
      title="1. Kích thước & Ký tự viết tắt (Initials)"
      description="Hiển thị ký tự viết tắt khi không có hình ảnh đại diện."
      code={avatarUsageCode}
    >
      <div className="flex flex-wrap items-end gap-6">
        {sizes.map((size) => (
          <div key={size} className="flex flex-col items-center gap-1.5">
            <Avatar size={size}>
              <AvatarFallback>TQ</AvatarFallback>
            </Avatar>
            <span className="text-caption-1-rg text-muted-foreground">{size}</span>
          </div>
        ))}
      </div>
    </CodePreview>

    {/* ── 2. Chỉ báo trạng thái hoạt động (Status) ── */}
    <section className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-xs">
      <div className="border-b border-border pb-3">
        <h2 className="text-title-1 font-semibold text-foreground">2. Chỉ báo trạng thái hoạt động (Status)</h2>
        <p className="text-body-2-rg text-muted-foreground mt-0.5">Trạng thái online, vắng mặt, bận hoặc offline.</p>
      </div>
      <div className="flex flex-wrap items-end gap-8 pt-2">
        {statuses.map((status) => (
          <div key={status} className="flex flex-col items-center gap-1.5">
            <Avatar size="md" status={status}>
              <AvatarFallback>TQ</AvatarFallback>
            </Avatar>
            <span className="text-caption-1-rg text-muted-foreground capitalize">{status}</span>
          </div>
        ))}
      </div>
    </section>

    {/* ── 3. Tải hình ảnh & Xử lý lỗi (Fallback) ── */}
    <section className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-xs">
      <div className="border-b border-border pb-3">
        <h2 className="text-title-1 font-semibold text-foreground">3. Tải hình ảnh & Xử lý lỗi (Fallback)</h2>
        <p className="text-body-2-rg text-muted-foreground mt-0.5">Tự động chuyển về ký tự viết tắt khi đường dẫn ảnh lỗi.</p>
      </div>
      <div className="flex flex-wrap items-end gap-6 pt-2">
        <div className="flex flex-col items-center gap-1.5">
          <Avatar size="lg">
            <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" alt="User" />
            <AvatarFallback>TQ</AvatarFallback>
          </Avatar>
          <span className="text-caption-1-rg text-muted-foreground">Ảnh hợp lệ</span>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <Avatar size="lg">
            <AvatarImage src="/broken-link.jpg" alt="Broken" />
            <AvatarFallback>TQ</AvatarFallback>
          </Avatar>
          <span className="text-caption-1-rg text-muted-foreground">Ảnh lỗi (Fallback)</span>
        </div>
      </div>
    </section>

    {/* ── 4. Nhóm Avatar (Avatar Group) ── */}
    <section className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-xs">
      <div className="border-b border-border pb-3">
        <h2 className="text-title-1 font-semibold text-foreground">4. Nhóm Avatar (Avatar Group)</h2>
        <p className="text-body-2-rg text-muted-foreground mt-0.5">Gộp nhiều avatar chồng lên nhau kèm số lượng dư.</p>
      </div>
      <div className="space-y-4 pt-2">
        {(['sm', 'md', 'lg'] as const).map((size) => (
          <div key={size} className="flex items-center gap-4">
            <span className="w-8 text-caption-1-sb text-muted-foreground uppercase">{size}</span>
            <AvatarGroup size={size} max={4}>
              <Avatar><AvatarFallback>A</AvatarFallback></Avatar>
              <Avatar><AvatarFallback>B</AvatarFallback></Avatar>
              <Avatar><AvatarFallback>C</AvatarFallback></Avatar>
              <Avatar><AvatarFallback>D</AvatarFallback></Avatar>
              <Avatar><AvatarFallback>E</AvatarFallback></Avatar>
              <Avatar><AvatarFallback>F</AvatarFallback></Avatar>
            </AvatarGroup>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default AvatarDevPage;
