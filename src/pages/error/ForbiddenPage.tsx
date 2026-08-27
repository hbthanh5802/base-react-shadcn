import { ArrowLeft, ShieldCross } from 'iconsax-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';

export const ForbiddenPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
      <div className="flex size-20 items-center justify-center rounded-full bg-destructive/10 text-destructive mb-6">
        <ShieldCross size={48} variant="Bold" />
      </div>
      <h1 className="text-4xl font-bold text-foreground mb-2">403</h1>
      <h2 className="text-xl font-semibold text-foreground mb-2">Truy cập bị từ chối</h2>
      <p className="text-muted-foreground max-w-md mb-6">
        Bạn không có đủ quyền hạn để truy cập vào trang này. Vui lòng liên hệ quản trị viên hoặc quay lại trang trước.
      </p>
      <Button variant="default" onClick={() => navigate('/dashboard')} className="gap-2">
        <ArrowLeft size={18} />
        <span>Về trang chủ</span>
      </Button>
    </div>
  );
};
