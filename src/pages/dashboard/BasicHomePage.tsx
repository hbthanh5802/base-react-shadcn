import { Code, Component, Flash, Home2, Layer, SecurityUser } from 'iconsax-react';
import React from 'react';
import { Link } from 'react-router-dom';

import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { selectUser, useAuthStore } from '@/shared/stores/auth.store';

export const BasicHomePage: React.FC = () => {
  const user = useAuthStore(selectUser);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between rounded-2xl border border-border bg-card p-6 md:p-8 shadow-xs">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge tone="brand" variant="light">
              Giao diện chuẩn (No Sidebar)
            </Badge>
          </div>
          <h1 className="text-title-1 font-bold text-foreground">
            Trang chủ Ứng dụng (HomePage)
          </h1>
          <p className="text-body-1-rg text-muted-foreground max-w-2xl">
            Đây là không gian làm việc chính cho người dùng cuối với bố cục toàn màn hình thoáng đãng,
            tối ưu diện tích hiển thị nội dung nghiệp vụ.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link to="/dashboard">
            <Button variant="outline">← Về Portal</Button>
          </Link>
          <Link to="/dev">
            <Button variant="default">Vào Dev Hub</Button>
          </Link>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="p-6 space-y-3">
          <div className="size-10 rounded-xl bg-primary-50 text-primary dark:bg-primary-950 flex items-center justify-center">
            <Component size={22} />
          </div>
          <CardTitle className="text-title-2">Sẵn sàng phát triển</CardTitle>
          <CardDescription className="text-body-2-rg">
            Bắt đầu tạo các trang nghiệp vụ mới bằng cách định nghĩa route và components bên trong thư mục <code>src/pages/</code>.
          </CardDescription>
        </Card>

        <Card className="p-6 space-y-3">
          <div className="size-10 rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950 flex items-center justify-center">
            <Code size={22} />
          </div>
          <CardTitle className="text-title-2">Type-safe & Tiêu chuẩn</CardTitle>
          <CardDescription className="text-body-2-rg">
            Tích hợp sẵn TypeScript, React Hook Form, Zod schema validation, Tailwind CSS tokens và TanStack Table.
          </CardDescription>
        </Card>

        <Card className="p-6 space-y-3">
          <div className="size-10 rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950 flex items-center justify-center">
            <Flash size={22} />
          </div>
          <CardTitle className="text-title-2">Theme Sáng / Tối</CardTitle>
          <CardDescription className="text-body-2-rg">
            Hỗ trợ chuyển đổi giao diện Dark/Light mode tức thì thông qua nút toggle trên thanh Header.
          </CardDescription>
        </Card>
      </div>
    </div>
  );
};

export default BasicHomePage;
