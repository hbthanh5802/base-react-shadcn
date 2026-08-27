import { Lock, Mail, Search, Send } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { DevBreadcrumb } from '@/pages/dev/_DevBreadcrumb';
import { CodePreview } from '@/shared/components/ui/code-block';
import { InputGlobal } from '@/shared/components/ui/input-global';

const formatCode = `// Tự động định dạng tiền tệ & bắt sự kiện click trên icon
<InputGlobal
  value={currencyRawVal}
  onChange={(e) => setCurrencyRawVal(e.target.value)}
  formatDisplayValue={(val) => val ? new Intl.NumberFormat('vi-VN').format(Number(val)) : ''}
  parseRawValue={(val) => val.replace(/\\D/g, '')}
  suffix={<span className="text-caption-1-sb text-muted-foreground">VNĐ</span>}
  placeholder="Nhập số tiền..."
/>

<InputGlobal
  defaultValue="nguyenvana@gmail.com"
  prefixIcon={<Mail size={18} />}
  suffixIcon={<Send size={18} />}
  onSuffixIconClick={() => toast.success('Đã gửi')}
  placeholder="Nhập email..."
/>`;

const clearablePasswordCode = `// 1. Nút xóa nhanh nội dung (Clearable)
<InputGlobal
  value={searchVal}
  onChange={(e) => setSearchVal(e.target.value)}
  clearable
  onClear={() => toast.info('Đã xóa')}
  prefixIcon={<Search size={18} />}
  placeholder="Nhập từ khóa..."
/>

// 2. Ẩn/Hiện mật khẩu (Password Toggle)
<InputGlobal
  type="password"
  showPasswordToggle
  prefixIcon={<Lock size={18} />}
  defaultValue="MatKhauBaoMat@123"
/>`;

const debounceCode = `// Trì hoãn gọi API tìm kiếm với debounce (500ms)
<InputGlobal
  placeholder="Gõ văn bản để tìm kiếm..."
  prefixIcon={<Search size={18} />}
  debounceTime={500}
  onDebouncedChange={(val) => {
    console.log('Debounced:', val);
  }}
/>`;

export const InputDevPage = () => {
  const [searchVal, setSearchVal] = useState('Dữ liệu mẫu');
  const [debouncedVal, setDebouncedVal] = useState('');
  const [currencyRawVal, setCurrencyRawVal] = useState('8000000');

  const formatCurrency = (val: string) => {
    if (!val) return '';
    const digits = val.replace(/\D/g, '');
    return digits ? new Intl.NumberFormat('vi-VN').format(Number(digits)) : '';
  };

  const parseCurrency = (val: string) => {
    return val.replace(/\D/g, '');
  };

  return (
    <div className="min-h-screen w-full space-y-8 bg-background p-6">
      <DevBreadcrumb label="Input" />
      <div className="space-y-1">
        <h1 className="text-heading-3 font-bold text-foreground">Input & InputGlobal</h1>
        <p className="text-body-1-rg text-muted-foreground">
          Ô nhập liệu nâng cao hỗ trợ icon đầu/cuối, định dạng số/tiền tệ, ẩn hiện mật khẩu và debounce tìm kiếm.
        </p>
      </div>

      {/* ── 1. Formatting & Clickable Icons ── */}
      <CodePreview
        title="1. Định dạng dữ liệu & Tương tác Icon"
        description="Tự động định dạng hiển thị (Formatting) và bắt sự kiện click trên icon."
        code={formatCode}
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-body-2-sb text-foreground">Định dạng tiền tệ (VNĐ)</label>
            <InputGlobal
              value={currencyRawVal}
              onChange={(e) => setCurrencyRawVal(e.target.value)}
              formatDisplayValue={formatCurrency}
              parseRawValue={parseCurrency}
              suffix={<span className="text-caption-1-sb text-muted-foreground">VNĐ</span>}
              placeholder="Nhập số tiền..."
            />
            <p className="text-caption-1-rg text-muted-foreground">
              Giá trị thô (State/API):{' '}
              <span className="font-mono font-semibold text-primary">{currencyRawVal || '(trống)'}</span>
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-body-2-sb text-foreground">Icon có thể bấm (Clickable Icon)</label>
            <InputGlobal
              defaultValue="nguyenvana@gmail.com"
              prefixIcon={<Mail size={18} />}
              suffixIcon={<Send size={18} />}
              onPrefixIconClick={() => toast.info('Đã bấm vào icon Email bên trái')}
              onSuffixIconClick={() => toast.success('Đã bấm vào nút Gửi bên phải')}
              placeholder="Nhập email..."
            />
            <p className="text-caption-1-rg text-muted-foreground">
              Click vào icon mũi tên bên phải để kích hoạt sự kiện gửi.
            </p>
          </div>
        </div>
      </CodePreview>

      {/* ── 2. Clearable & Password Toggle ── */}
      <CodePreview
        title="2. Nút Xóa nhanh (Clearable) & Ẩn/Hiện mật khẩu"
        description="Tiện ích xóa nhanh giá trị và xem mật khẩu."
        code={clearablePasswordCode}
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-body-2-sb text-foreground">Nút xóa nhanh nội dung (Clearable)</label>
            <InputGlobal
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              clearable
              onClear={() => toast.info('Đã xóa dữ liệu ô tìm kiếm')}
              prefixIcon={<Search size={18} />}
              placeholder="Nhập từ khóa..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-body-2-sb text-foreground">Ô nhập mật khẩu (Password Toggle)</label>
            <InputGlobal
              type="password"
              showPasswordToggle
              prefixIcon={<Lock size={18} />}
              defaultValue="MatKhauBaoMat@123"
              placeholder="Nhập mật khẩu..."
            />
          </div>
        </div>
      </CodePreview>

      {/* ── 3. Debounce Search ── */}
      <CodePreview
        title="3. Trì hoãn tìm kiếm (Debounce Change)"
        description="Giảm thiểu số lượng request gọi API khi người dùng đang gõ phím."
        code={debounceCode}
      >
        <div className="space-y-3">
          <InputGlobal
            placeholder="Gõ văn bản để kiểm tra debounce (500ms)..."
            prefixIcon={<Search size={18} />}
            debounceTime={500}
            onDebouncedChange={(val) => {
              setDebouncedVal(val);
              if (val) toast.success(`Debounced value: "${val}"`);
            }}
          />
          <p className="text-body-2-rg text-muted-foreground">
            Kết quả Debounce sau 500ms:{' '}
            <span className="font-mono font-semibold text-primary">{debouncedVal || '(chưa nhập)'}</span>
          </p>
        </div>
      </CodePreview>

      {/* ── 4. Input Sizes ── */}
      <section className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-xs">
        <div className="border-b border-border pb-3">
          <h2 className="text-title-1 font-semibold text-foreground">4. Kích thước trường nhập liệu (Input Sizes)</h2>
          <p className="text-body-2-rg text-muted-foreground mt-0.5">
            Hỗ trợ 3 kích thước: Nhỏ (Small), Vừa (Medium) và Lớn (Large).
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 pt-2">
          <div className="space-y-1.5">
            <label className="text-caption-1-sb text-muted-foreground">Small (h-8)</label>
            <InputGlobal size="small" placeholder="Kích thước nhỏ (small)..." />
          </div>
          <div className="space-y-1.5">
            <label className="text-caption-1-sb text-muted-foreground">Medium (h-10)</label>
            <InputGlobal size="medium" placeholder="Kích thước vừa (medium)..." />
          </div>
          <div className="space-y-1.5">
            <label className="text-caption-1-sb text-muted-foreground">Large (h-12)</label>
            <InputGlobal size="large" placeholder="Kích thước lớn (large)..." />
          </div>
        </div>
      </section>
    </div>
  );
};

export default InputDevPage;
