import { ArrowLeft, SearchNormal1 } from 'iconsax-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
      <div className="flex size-20 items-center justify-center rounded-full bg-primary-100 text-primary-700 mb-6">
        <SearchNormal1 size={48} variant="Bold" />
      </div>
      <h1 className="text-4xl font-bold text-foreground mb-2">404</h1>
      <h2 className="text-xl font-semibold text-foreground mb-2">Không tìm thấy trang</h2>
      <p className="text-muted-foreground max-w-md mb-6">
        Đường dẫn bạn yêu cầu không tồn tại hoặc đã được di chuyển.
      </p>
      <Button variant="default" onClick={() => navigate('/dashboard')} className="gap-2">
        <ArrowLeft size={18} />
        <span>Về trang chủ</span>
      </Button>
    </div>
  );
};
