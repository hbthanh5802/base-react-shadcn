import {
  Code,
  Component,
  Element3,
  Flash,
  Home2,
  Layer,
  Setting2,
} from 'iconsax-react';
import { ArrowRight, Sparkles } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { selectUser, useAuthStore } from '@/shared/stores/auth.store';

export const HomePage: React.FC = () => {
  const user = useAuthStore(selectUser);

  return (
    <div className="mx-auto max-w-5xl space-y-10 py-6">
      {/* Welcome Banner */}
      <div className="rounded-3xl border border-border bg-gradient-to-r from-primary-50/80 via-card to-card p-8 md:p-10 shadow-xs dark:from-primary-950/40">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-100 px-3.5 py-1 text-caption-1-sb text-primary-700 dark:bg-primary-900/60 dark:text-primary-300">
            <Sparkles size={14} />
            <span>Base Starter Template v1.0</span>
          </div>
          <h1 className="text-heading-2 text-foreground font-bold tracking-tight">
            Xin chào, {user?.fullName || 'bạn'}!
          </h1>
          <p className="text-body-1-rg text-muted-foreground leading-relaxed">
            Chào mừng bạn đến với hệ thống. Hãy chọn không gian làm việc bạn muốn truy cập bên dưới:
          </p>
        </div>
      </div>

      {/* 2 Main Cards Section */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Card 1: HomePage (Basic No Sidebar) */}
        <Card className="group relative flex flex-col justify-between overflow-hidden border-2 border-border/80 transition-all duration-200 hover:-translate-y-1 hover:border-primary-400 hover:shadow-xl bg-card">
          <div className="absolute top-0 right-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-primary-500/10 blur-2xl transition-all group-hover:scale-125" />

          <CardHeader className="space-y-3 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-primary-50 text-primary dark:bg-primary-950/80 dark:text-primary-400 shadow-xs">
                <Home2 size={32} />
              </div>
              <Badge tone="gray" variant="light" size="sm">
                No Sidebar Layout
              </Badge>
            </div>

            <CardTitle className="text-title-1 font-bold text-foreground">
              HomePage
            </CardTitle>
            <CardDescription className="text-body-2-rg text-muted-foreground leading-relaxed">
              Trang giao diện ứng dụng tiêu chuẩn, bố cục toàn màn hình tinh gọn (không có sidebar),
              sẵn sàng để bạn bắt đầu xây dựng các tính năng và nghiệp vụ mới.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-2.5 pt-2">
            <div className="flex items-center gap-2 text-caption-1-rg text-muted-foreground">
              <span className="size-1.5 rounded-full bg-primary" />
              <span>Bố cục Full-width tối giản chỉ có Header</span>
            </div>
            <div className="flex items-center gap-2 text-caption-1-rg text-muted-foreground">
              <span className="size-1.5 rounded-full bg-primary" />
              <span>Giao diện làm việc tập trung cho người dùng cuối</span>
            </div>
          </CardContent>

          <CardFooter className="pt-4 border-t border-border/60">
            <Link to="/home" className="w-full">
              <Button
                variant="default"
                size="large"
                className="w-full justify-between gap-2 shadow-xs group-hover:bg-primary-700"
              >
                <span>Truy cập HomePage</span>
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Card 2: DevHub (With Sidebar) */}
        <Card className="group relative flex flex-col justify-between overflow-hidden border-2 border-border/80 transition-all duration-200 hover:-translate-y-1 hover:border-indigo-400 hover:shadow-xl bg-card">
          <div className="absolute top-0 right-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-indigo-500/10 blur-2xl transition-all group-hover:scale-125" />

          <CardHeader className="space-y-3 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/80 dark:text-indigo-400 shadow-xs">
                <Element3 size={32} />
              </div>
              <Badge tone="purple" variant="light" size="sm">
                Sidebar Navigation
              </Badge>
            </div>

            <CardTitle className="text-title-1 font-bold text-foreground">
              Dev Hub
            </CardTitle>
            <CardDescription className="text-body-2-rg text-muted-foreground leading-relaxed">
              Khu vực dành cho lập trình viên với thanh Sidebar chuyên dụng, liệt kê đầy đủ hơn 35+
              UI components, form validation, bảng dữ liệu và trang mẫu nghiệp vụ.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-2.5 pt-2">
            <div className="flex items-center gap-2 text-caption-1-rg text-muted-foreground">
              <span className="size-1.5 rounded-full bg-indigo-600" />
              <span>Thanh Sidebar phân nhóm đa cấp toàn bộ UI Components</span>
            </div>
            <div className="flex items-center gap-2 text-caption-1-rg text-muted-foreground">
              <span className="size-1.5 rounded-full bg-indigo-600" />
              <span>Interactive Playground, xem trước trạng thái & mã nguồn</span>
            </div>
          </CardContent>

          <CardFooter className="pt-4 border-t border-border/60">
            <Link to="/dev" className="w-full">
              <Button
                variant="outlinePrimary"
                size="large"
                className="w-full justify-between gap-2 shadow-xs group-hover:bg-primary-50"
              >
                <span>Khám phá Dev Hub</span>
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
