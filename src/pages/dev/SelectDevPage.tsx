import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { DevBreadcrumb } from '@/pages/dev/_DevBreadcrumb';
import { Form, SelectField } from '@/shared/components/form';
import { Button } from '@/shared/components/ui/button';
import { CodePreview } from '@/shared/components/ui/code-block';
import { Label } from '@/shared/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { z, zodResolver, zRequired } from '@/shared/lib/zod';

const basicSelectCode = `import { useState } from 'react';
import { Label } from '@/shared/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';

export function BasicSelectDemo() {
  const [value, setValue] = useState('review');

  return (
    <div className="space-y-2 max-w-sm">
      <Label htmlFor="status-select" className="text-body-1-sb font-semibold text-foreground">
        Trạng thái phê duyệt
      </Label>
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger id="status-select" aria-label="Trạng thái phê duyệt">
          <SelectValue placeholder="Chọn trạng thái..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="draft">Bản nháp (Draft)</SelectItem>
          <SelectItem value="review">Đang thẩm định (In Review)</SelectItem>
          <SelectItem value="approved">Đã phê duyệt (Approved)</SelectItem>
          <SelectItem value="rejected">Từ chối (Rejected)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}`;

const groupSelectCode = `import { useState } from 'react';
import { Label } from '@/shared/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';

export function GroupSelectDemo() {
  const [value, setValue] = useState('vn-hn');

  return (
    <div className="space-y-2 max-w-sm">
      <Label className="text-body-1-sb font-semibold text-foreground">
        Chọn chi nhánh làm việc
      </Label>
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger>
          <SelectValue placeholder="Chọn chi nhánh..." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Khu vực Miền Bắc</SelectLabel>
            <SelectItem value="vn-hn">Hà Nội (Trụ sở chính)</SelectItem>
            <SelectItem value="vn-hp">Hải Phòng</SelectItem>
            <SelectItem value="vn-qn">Quảng Ninh</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Khu vực Miền Nam</SelectLabel>
            <SelectItem value="vn-hcm">Hồ Chí Minh</SelectItem>
            <SelectItem value="vn-bd">Bình Dương</SelectItem>
            <SelectItem value="vn-ct">Cần Thơ</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}`;

// ── 3. Form Validation & Disabled State Demo ─────────────────────────────────

const statesSchema = z.object({
  role: zRequired('Vui lòng chọn chức vụ bắt buộc'),
  department: z.string().optional(),
});

type StatesFormValues = z.infer<typeof statesSchema>;

const StatesSelectFormDemo = () => {
  const form = useForm<StatesFormValues>({
    resolver: zodResolver(statesSchema),
    defaultValues: { role: '', department: 'it-locked' },
  });

  return (
    <Form
      form={form}
      onSubmit={(v) => alert(JSON.stringify(v, null, 2))}
      className="space-y-4 max-w-xl"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <SelectField<StatesFormValues>
          name="role"
          label="Chức vụ chuyên môn"
          required
          placeholder="Chọn chức vụ..."
          options={[
            { label: 'Frontend Developer', value: 'fe' },
            { label: 'Backend Developer', value: 'be' },
            { label: 'UI/UX Designer', value: 'designer' },
            { label: 'Product Manager', value: 'pm' },
          ]}
        />
        <SelectField<StatesFormValues>
          name="department"
          label="Phòng ban (Đã khóa)"
          disabled
          placeholder="Chọn phòng ban..."
          options={[
            { label: 'Phòng Công nghệ Thông tin (Khóa)', value: 'it-locked' },
            { label: 'Phòng Kế toán', value: 'accounting' },
          ]}
        />
      </div>
      <div className="flex gap-3">
        <Button type="submit">Kiểm tra Submit Form</Button>
        <Button type="button" variant="outline" onClick={() => form.reset()}>
          Đặt lại
        </Button>
      </div>
    </Form>
  );
};

export const SelectDevPage = () => {
  const [basicValue, setBasicValue] = useState('review');
  const [groupValue, setGroupValue] = useState('vn-hn');

  return (
    <div className="min-h-screen w-full space-y-8 bg-background p-6">
      <DevBreadcrumb label="Select" />
      <div className="space-y-1">
        <h1 className="text-heading-3 font-bold text-foreground">Select</h1>
        <p className="text-body-1-rg text-muted-foreground">
          Trình đơn lựa chọn giá trị đơn lẻ với hiệu ứng trượt êm ái xây dựng trên nền tảng Radix UI.
        </p>
      </div>

      {/* ── 1. Basic Select ── */}
      <CodePreview
        title="1. Lựa chọn trạng thái hồ sơ (Basic Select)"
        description="Select đơn giản với nhãn chữ Label rõ ràng, sắc nét và bố cục thoáng đãng."
        code={basicSelectCode}
      >
        <div className="space-y-4 max-w-sm">
          <div className="space-y-2">
            <Label htmlFor="basic-select" className="text-body-1-sb font-semibold text-foreground block">
              Trạng thái phê duyệt
            </Label>
            <Select value={basicValue} onValueChange={setBasicValue}>
              <SelectTrigger id="basic-select" aria-label="Trạng thái phê duyệt">
                <SelectValue placeholder="Chọn trạng thái..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Bản nháp (Draft)</SelectItem>
                <SelectItem value="review">Đang thẩm định (In Review)</SelectItem>
                <SelectItem value="approved">Đã phê duyệt (Approved)</SelectItem>
                <SelectItem value="rejected">Từ chối (Rejected)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <p className="text-body-2-rg text-muted-foreground">
            Giá trị đã chọn: <span className="font-mono font-semibold text-primary">{basicValue}</span>
          </p>
        </div>
      </CodePreview>

      {/* ── 2. Grouped Select ── */}
      <CodePreview
        title="2. Phân nhóm danh mục (SelectGroup & SelectLabel)"
        description="Sử dụng SelectGroup và SelectLabel để phân loại danh mục theo nhóm với đường phân cách SelectSeparator."
        code={groupSelectCode}
      >
        <div className="space-y-4 max-w-sm">
          <div className="space-y-2">
            <Label htmlFor="group-select" className="text-body-1-sb font-semibold text-foreground block">
              Chọn chi nhánh làm việc
            </Label>
            <Select value={groupValue} onValueChange={setGroupValue}>
              <SelectTrigger id="group-select" aria-label="Chọn chi nhánh làm việc">
                <SelectValue placeholder="Chọn chi nhánh..." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Khu vực Miền Bắc</SelectLabel>
                  <SelectItem value="vn-hn">Hà Nội (Trụ sở chính)</SelectItem>
                  <SelectItem value="vn-hp">Hải Phòng</SelectItem>
                  <SelectItem value="vn-qn">Quảng Ninh</SelectItem>
                </SelectGroup>
                <SelectSeparator />
                <SelectGroup>
                  <SelectLabel>Khu vực Miền Nam</SelectLabel>
                  <SelectItem value="vn-hcm">Hồ Chí Minh</SelectItem>
                  <SelectItem value="vn-bd">Bình Dương</SelectItem>
                  <SelectItem value="vn-ct">Cần Thơ</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CodePreview>

      {/* ── 3. Error & Disabled States via Form ── */}
      <CodePreview
        title="3. Trạng thái Báo lỗi (Error) & Vô hiệu hóa (Disabled) trong Form"
        description="Tích hợp SelectField vào hệ thống Form và xác thực Zod schema với cảnh báo lỗi khi chưa chọn trường bắt buộc và trường bị vô hiệu hóa."
        code={`import { useForm } from 'react-hook-form';
import { Form, SelectField } from '@/shared/components/form';
import { Button } from '@/shared/components/ui/button';
import { z, zodResolver, zRequired } from '@/shared/lib/zod';

const statesSchema = z.object({
  role: zRequired('Vui lòng chọn chức vụ bắt buộc'),
  department: z.string().optional(),
});

type StatesFormValues = z.infer<typeof statesSchema>;

export function StatesSelectFormDemo() {
  const form = useForm<StatesFormValues>({
    resolver: zodResolver(statesSchema),
    defaultValues: { role: '', department: 'it-locked' },
  });

  return (
    <Form
      form={form}
      onSubmit={(v) => alert(JSON.stringify(v, null, 2))}
      className="space-y-4 max-w-xl"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <SelectField<StatesFormValues>
          name="role"
          label="Chức vụ chuyên môn"
          required
          placeholder="Chọn chức vụ..."
          options={[
            { label: 'Frontend Developer', value: 'fe' },
            { label: 'Backend Developer', value: 'be' },
            { label: 'UI/UX Designer', value: 'designer' },
            { label: 'Product Manager', value: 'pm' },
          ]}
        />
        <SelectField<StatesFormValues>
          name="department"
          label="Phòng ban (Đã khóa)"
          disabled
          placeholder="Chọn phòng ban..."
          options={[
            { label: 'Phòng Công nghệ Thông tin (Khóa)', value: 'it-locked' },
            { label: 'Phòng Kế toán', value: 'accounting' },
          ]}
        />
      </div>
      <div className="flex gap-3">
        <Button type="submit">Kiểm tra Submit Form</Button>
        <Button type="button" variant="outline" onClick={() => form.reset()}>
          Đặt lại
        </Button>
      </div>
    </Form>
  );
}`}
      >
        <StatesSelectFormDemo />
      </CodePreview>
    </div>
  );
};

export default SelectDevPage;
