import { useState } from 'react';

import { DevBreadcrumb } from '@/pages/dev/_DevBreadcrumb';
import { CodePreview } from '@/shared/components/ui/code-block';
import { Textarea } from '@/shared/components/ui/textarea';

const textareaCode = `import { useState } from 'react';
import { Textarea } from '@/shared/components/ui/textarea';

export function TextareaExample() {
  const [value, setValue] = useState('');

  return (
    <div className="space-y-2 max-w-xl">
      <Textarea
        rows={4}
        value={value}
        placeholder="Nhập nội dung ghi chú..."
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="flex justify-between items-center text-xs text-muted-foreground">
        <span>Tối đa: 500 ký tự</span>
        <span className="font-mono font-medium text-foreground">Số ký tự: {value.length}</span>
      </div>
    </div>
  );
}`;

export const TextareaDevPage = () => {
  const [value, setValue] = useState('');

  return (
    <div className="min-h-screen w-full space-y-8 bg-background p-6">
      <DevBreadcrumb label="Textarea" />
      <div className="space-y-1">
        <h1 className="text-heading-3 font-bold text-foreground">Textarea</h1>
        <p className="text-body-1-rg text-muted-foreground">
          Vùng nhập văn bản nhiều dòng phục vụ nhập ghi chú, nội dung chi tiết và mô tả dài.
        </p>
      </div>

      <CodePreview
        title="1. Nhập văn bản có đếm ký tự"
        description="Tự động bắt sự kiện gõ phím và tính toán độ dài văn bản."
        code={textareaCode}
      >
        <div className="space-y-3 max-w-xl">
          <Textarea
            aria-label="textarea-playground"
            rows={4}
            value={value}
            placeholder="Nhập nội dung ghi chú hoặc ý kiến đóng góp..."
            onChange={(e) => setValue(e.target.value)}
          />
          <div className="flex justify-between items-center text-caption-1-rg text-muted-foreground">
            <span>Tối đa: 500 ký tự</span>
            <span className="font-mono font-medium text-foreground">Số ký tự: {value.length}</span>
          </div>
        </div>
      </CodePreview>
    </div>
  );
};

export default TextareaDevPage;
