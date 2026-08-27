import { useNavigate } from 'react-router-dom';

import { Breadcrumb } from '@/shared/components/ui/breadcrumb';

export const DevBreadcrumb = ({ label }: { label: string }) => {
  const navigate = useNavigate();
  return (
    <Breadcrumb
      items={[{ label: 'Dev Hub', href: '/dev' }, { label }]}
      onNavigate={(_, item, e) => {
        e.preventDefault();
        if (item.href) navigate(item.href);
      }}
    />
  );
};
