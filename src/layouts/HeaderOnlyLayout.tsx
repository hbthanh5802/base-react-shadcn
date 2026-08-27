import React from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from '@/layouts/components/Header';

export const HeaderOnlyLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 overflow-x-hidden p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default HeaderOnlyLayout;
