import { Lock, MoneySend, SearchNormal1 } from 'iconsax-react';
import { X } from 'lucide-react';
import { type ReactNode } from 'react';
import { useForm } from 'react-hook-form';

import { DevBreadcrumb } from '@/pages/dev/_DevBreadcrumb';
import {
  CheckboxField,
  DateField,
  Form,
  InputGlobalField,
  MultiSelectField,
  RadioGroupField,
  SelectField,
  SwitchField,
  TextareaField,
  TextField,
} from '@/shared/components/form';
import { Button } from '@/shared/components/ui/button';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Chip } from '@/shared/components/ui/chip';
import { z, zEmail, zodResolver, zPhone, zRequired } from '@/shared/lib/zod';

const Section = ({ title, description, children }: { title: string; description?: string; children: ReactNode }) => (
  <section className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-xs">
    <div className="border-b border-border pb-3">
      <h2 className="text-title-1 font-semibold text-foreground">{title}</h2>
      {description && <p className="text-body-2-rg text-muted-foreground mt-0.5">{description}</p>}
    </div>
    {children}
  </section>
);

// ── 1. Basic form ──────────────────────────────────────────────────────────────

type BasicFormValues = {
  fullName: string;
  email: string;
  role: string;
  notes: string;
  active: boolean;
};

const BasicFormDemo = () => {
  const form = useForm<BasicFormValues>({
    defaultValues: { fullName: '', email: '', role: '', notes: '', active: false },
  });

  return (
    <Form form={form} onSubmit={(v) => alert(JSON.stringify(v, null, 2))}>
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField<BasicFormValues> name="fullName" label="Họ và tên" placeholder="Nguyễn Văn A" />
        <TextField<BasicFormValues>
          name="email"
          label="Email"
          type="email"
          placeholder="example@mail.com"
        />
      </div>
      <SelectField<BasicFormValues>
        name="role"
        label="Vai trò"
        placeholder="Chọn vai trò..."
        options={[
          { label: 'Quản trị viên', value: 'admin' },
          { label: 'Biên tập viên', value: 'editor' },
          { label: 'Người dùng', value: 'user' },
        ]}
      />
      <TextareaField<BasicFormValues> name="notes" label="Ghi chú" placeholder="Nhập ghi chú..." />
      <CheckboxField<BasicFormValues> name="active" label="Kích hoạt tài khoản" />
      <Button type="submit">Gửi dữ liệu</Button>
    </Form>
  );
};

// ── 2. Validation with Zod ─────────────────────────────────────────────────────

const validationSchema = z.object({
  username: zRequired('Tên đăng nhập là bắt buộc').min(3, 'Tối thiểu 3 ký tự'),
  email: zEmail(),
  phone: zPhone(),
  password: z.string().min(8, 'Mật khẩu tối thiểu 8 ký tự'),
});

type ValidationFormValues = z.infer<typeof validationSchema>;

const ValidationFormDemo = () => {
  const form = useForm<ValidationFormValues>({
    resolver: zodResolver(validationSchema),
    defaultValues: { username: '', email: '', phone: '', password: '' },
    mode: 'onBlur',
  });

  return (
    <Form form={form} onSubmit={(v) => alert(JSON.stringify(v, null, 2))}>
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField<ValidationFormValues>
          name="username"
          label="Tên đăng nhập"
          required
          placeholder="min 3 ký tự"
        />
        <TextField<ValidationFormValues>
          name="email"
          label="Email"
          type="email"
          required
          placeholder="user@example.com"
        />
        <TextField<ValidationFormValues>
          name="phone"
          label="Số điện thoại"
          required
          placeholder="0912345678"
        />
        <TextField<ValidationFormValues>
          name="password"
          label="Mật khẩu"
          type="password"
          required
          placeholder="min 8 ký tự"
        />
      </div>
      <p className="text-body-3-rg text-neutral-500">Nhập sai → blur để thấy lỗi validation</p>
      <Button type="submit">Xác nhận</Button>
    </Form>
  );
};

// ── 3. Date Field ──────────────────────────────────────────────────────────────

type DateFormValues = { birthDate: Date | null; joinDate: Date | null };

const DateFieldDemo = () => {
  const form = useForm<DateFormValues>({
    defaultValues: { birthDate: null, joinDate: null },
  });
  const vals = form.watch();

  return (
    <Form form={form} onSubmit={(v) => alert(JSON.stringify(v, null, 2))}>
      <div className="grid gap-4 sm:grid-cols-2">
        <DateField<DateFormValues>
          name="birthDate"
          label="Ngày sinh"
          required
          placeholder="Chọn ngày sinh..."
        />
        <DateField<DateFormValues>
          name="joinDate"
          label="Ngày gia nhập"
          placeholder="Chọn ngày..."
          pickerMode="month"
        />
      </div>
      {(vals.birthDate || vals.joinDate) && (
        <p className="text-body-3-rg text-neutral-600">
          Giá trị: {vals.birthDate ? new Date(vals.birthDate).toLocaleDateString('vi-VN') : '—'} /{' '}
          {vals.joinDate ? new Date(vals.joinDate).toLocaleDateString('vi-VN') : '—'}
        </p>
      )}
      <Button type="submit">Lưu</Button>
    </Form>
  );
};

// ── 4. Switch + Radio Group ────────────────────────────────────────────────────

type ToggleFormValues = {
  notifications: boolean;
  theme: boolean;
  gender: string;
  priority: string;
};

const ToggleFieldsDemo = () => {
  const form = useForm<ToggleFormValues>({
    defaultValues: { notifications: true, theme: false, gender: '', priority: '' },
  });

  return (
    <Form form={form} onSubmit={(v) => alert(JSON.stringify(v, null, 2))}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-3">
          <p className="text-body-2-sb text-neutral-700">Switch Fields</p>
          <SwitchField<ToggleFormValues>
            name="notifications"
            label="Bật thông báo"
            description="Nhận email & push notification"
          />
          <SwitchField<ToggleFormValues> name="theme" label="Chế độ tối" iconMode="all" />
        </div>

        <div className="space-y-3">
          <RadioGroupField<ToggleFormValues>
            name="gender"
            label="Giới tính"
            options={[
              { label: 'Nam', value: 'male' },
              { label: 'Nữ', value: 'female' },
              { label: 'Khác', value: 'other' },
            ]}
            direction="horizontal"
          />
        </div>
      </div>

      <RadioGroupField<ToggleFormValues>
        name="priority"
        label="Mức độ ưu tiên"
        description="Chọn mức độ ưu tiên cho nhiệm vụ"
        options={[
          { label: 'Thấp', value: 'low' },
          { label: 'Trung bình', value: 'medium' },
          { label: 'Cao', value: 'high' },
          { label: 'Khẩn cấp', value: 'urgent', disabled: true },
        ]}
        direction="horizontal"
      />

      <Button type="submit">Lưu cài đặt</Button>
    </Form>
  );
};

// ── 5. Full Combined Form ──────────────────────────────────────────────────────

const fullSchema = z.object({
  name: zRequired(),
  email: zEmail(),
  department: zRequired('Vui lòng chọn phòng ban'),
  role: z.string().min(1, 'Vui lòng chọn vai trò'),
  startDate: z.date().nullable(),
  bio: z.string().optional(),
  receiveUpdates: z.boolean(),
  notifyMode: z.string().min(1, 'Vui lòng chọn hình thức thông báo'),
});

type FullFormValues = z.infer<typeof fullSchema>;

const FullFormDemo = () => {
  const form = useForm<FullFormValues>({
    resolver: zodResolver(fullSchema),
    defaultValues: {
      name: '',
      email: '',
      department: '',
      role: '',
      startDate: null,
      bio: '',
      receiveUpdates: false,
      notifyMode: '',
    },
  });

  return (
    <Form form={form} onSubmit={(v) => alert(JSON.stringify(v, null, 2))}>
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField<FullFormValues> name="name" label="Họ và tên" required />
        <TextField<FullFormValues>
          name="email"
          label="Email"
          type="email"
          required
          placeholder="user@example.com"
        />
        <SelectField<FullFormValues>
          name="department"
          label="Phòng ban"
          required
          options={[
            { label: 'Kỹ thuật', value: 'engineering' },
            { label: 'Thiết kế', value: 'design' },
            { label: 'Vận hành', value: 'operations' },
            { label: 'Nhân sự', value: 'hr' },
          ]}
        />
        <SelectField<FullFormValues>
          name="role"
          label="Chức vụ"
          required
          options={[
            { label: 'Trưởng nhóm', value: 'lead' },
            { label: 'Thành viên', value: 'member' },
            { label: 'Thực tập sinh', value: 'intern' },
          ]}
        />
        <DateField<FullFormValues>
          name="startDate"
          label="Ngày bắt đầu"
          required
          placeholder="Chọn ngày..."
        />
      </div>

      <TextareaField<FullFormValues>
        name="bio"
        label="Giới thiệu bản thân"
        placeholder="Mô tả ngắn về bản thân..."
        description="Tối đa 500 ký tự"
        maxLength={500}
      />

      <RadioGroupField<FullFormValues>
        name="notifyMode"
        label="Hình thức thông báo"
        required
        options={[
          { label: 'Email', value: 'email' },
          { label: 'SMS', value: 'sms' },
          { label: 'Push notification', value: 'push' },
        ]}
        direction="horizontal"
      />

      <SwitchField<FullFormValues>
        name="receiveUpdates"
        label="Nhận cập nhật sản phẩm"
        description="Chúng tôi sẽ gửi thông tin mới nhất đến bạn"
      />

      <div className="flex gap-3">
        <Button type="button" variant="outline" onClick={() => form.reset()}>
          Đặt lại
        </Button>
        <Button type="submit">Tạo tài khoản</Button>
      </div>
    </Form>
  );
};

// ── 6. Multi-Select Field ──────────────────────────────────────────────────────

type MultiSelectFormValues = {
  skills: string[];
  locations: string[];
};

const MultiSelectDemo = () => {
  const form = useForm<MultiSelectFormValues>({
    defaultValues: { skills: ['react'], locations: [] },
  });

  return (
    <Form form={form} onSubmit={(v) => alert(JSON.stringify(v, null, 2))}>
      <div className="grid gap-4 sm:grid-cols-2">
        <MultiSelectField<MultiSelectFormValues>
          name="skills"
          label="Kỹ năng chuyên môn (Có tìm kiếm)"
          placeholder="Chọn kỹ năng..."
          options={[
            { label: 'React', value: 'react' },
            { label: 'TypeScript', value: 'typescript' },
            { label: 'Tailwind CSS', value: 'tailwind' },
            { label: 'Next.js', value: 'nextjs' },
            { label: 'Node.js', value: 'nodejs' },
            { label: 'Python', value: 'python' },
            { label: 'Go', value: 'go' },
          ]}
        />
        <MultiSelectField<MultiSelectFormValues>
          name="locations"
          label="Địa điểm làm việc (Không tìm kiếm)"
          placeholder="Chọn địa điểm..."
          searchable={false}
          options={[
            { label: 'Hà Nội', value: 'hanoi' },
            { label: 'Hồ Chí Minh', value: 'hcm' },
            { label: 'Đà Nẵng', value: 'danang' },
            { label: 'Cần Thơ', value: 'cantho' },
            { label: 'Hải Phòng', value: 'haiphong' },
          ]}
        />
      </div>
      <Button type="submit" className="mt-4">
        Xác nhận lựa chọn
      </Button>
    </Form>
  );
};

// ── 7. Custom Multi-Select ─────────────────────────────────────────────────────

type CustomFormValues = {
  selectedUsers: string[];
};

const MultiSelectCustomDemo = () => {
  const form = useForm<CustomFormValues>({
    defaultValues: { selectedUsers: ['user1', 'user2'] },
  });

  return (
    <Form form={form} onSubmit={(v) => alert(JSON.stringify(v, null, 2))}>
      <div className="grid gap-4 sm:grid-cols-2">
        <MultiSelectField<CustomFormValues>
          name="selectedUsers"
          label="Custom Rendering (Dạng Chip có nút X ở input, Hộp Checkbox ở dropdown)"
          placeholder="Chọn thành viên..."
          options={[
            { label: 'Nguyễn Văn A', value: 'user1' },
            { label: 'Trần Thị B', value: 'user2' },
            { label: 'Lê Văn C', value: 'user3' },
            { label: 'Phạm Thị D', value: 'user4' },
            { label: 'Trần Thị E', value: 'user5' },
            { label: 'Nguyễn Văn F', value: 'user6' },
            { label: 'Phạm Thị G', value: 'user7' },
          ]}
          renderSelected={(selected, onRemove) => (
            <div className="flex flex-wrap items-center gap-1.5">
              {selected.map((opt) => (
                <Chip
                  key={opt.value}
                  tone="neutral"
                  size="small"
                  className="flex items-center gap-1 border border-neutral-200 bg-neutral-100 text-neutral-800"
                >
                  <span className="max-w-[120px] truncate">{opt.label}</span>
                  <span
                    role="button"
                    tabIndex={0}
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove(e, opt.value);
                    }}
                    onPointerDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.stopPropagation();
                        onRemove(e as unknown as React.MouseEvent, opt.value);
                      }
                    }}
                    className="cursor-pointer rounded-full p-0.5 hover:bg-neutral-250"
                  >
                    <X className="h-3 w-3 text-neutral-600" />
                  </span>
                </Chip>
              ))}
            </div>
          )}
          renderItem={(opt, isSelected) => (
            <div className="flex items-center gap-2.5">
              <Checkbox
                checked={isSelected}
                disabled={opt.disabled}
                className="pointer-events-none"
              />
              <span>{opt.label}</span>
            </div>
          )}
        />
      </div>
      <Button type="submit" className="mt-4">
        Xác nhận custom
      </Button>
    </Form>
  );
};

// ── 8. Multi-Select Validation ─────────────────────────────────────────────────

const multiSelectValidationSchema = z.object({
  roles: z
    .array(z.string())
    .min(1, 'Vui lòng chọn ít nhất 1 vai trò')
    .max(3, 'Tối đa chỉ chọn 3 vai trò'),
});

type MultiSelectValidationValues = z.infer<typeof multiSelectValidationSchema>;

const MultiSelectValidationDemo = () => {
  const form = useForm<MultiSelectValidationValues>({
    resolver: zodResolver(multiSelectValidationSchema),
    defaultValues: { roles: [] },
    mode: 'onChange',
  });

  return (
    <Form form={form} onSubmit={(v) => alert(JSON.stringify(v, null, 2))}>
      <div className="max-w-md space-y-4">
        <MultiSelectField<MultiSelectValidationValues>
          name="roles"
          label="Vai trò tài khoản (Bắt buộc, Chọn từ 1 đến 3)"
          required
          placeholder="Chọn vai trò..."
          maxSelect={3}
          options={[
            { label: 'Administrator', value: 'admin' },
            { label: 'Manager', value: 'manager' },
            { label: 'Editor', value: 'editor' },
            { label: 'Viewer', value: 'viewer' },
            { label: 'Contributor', value: 'contributor' },
          ]}
        />
        <p className="text-body-3-rg text-neutral-500">
          Hãy bỏ chọn toàn bộ (để kiểm tra lỗi bắt buộc) hoặc chọn tối đa 3 vai trò (giao diện sẽ tự
          động vô hiệu hóa các vai trò còn lại khi đạt giới hạn).
        </p>
        <Button type="submit">Gửi dữ liệu</Button>
      </div>
    </Form>
  );
};

// ── 9. Infinite Scroll Select Demo ─────────────────────────────────────────────

type InfiniteFormValues = {
  remoteModule: string;
};

const InfiniteScrollSelectDemo = () => {
  const form = useForm<InfiniteFormValues>({
    defaultValues: { remoteModule: '' },
  });

  // Mock API fetch function
  const fetchMockModules = async ({ page, search }: { page: number; search: string }) => {
    // Simulate network latency
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Mock data generation
    const allItems = Array.from({ length: 50 }, (_, i) => ({
      label: `Phân hệ quản lý ${i + 1} (${search ? `Tìm: ${search}` : 'Tất cả'})`,
      value: `module-${i + 1}`,
    }));

    // Filter by search
    const filtered = allItems.filter((item) =>
      item.label.toLowerCase().includes(search.toLowerCase()),
    );

    const pageSize = 10;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginated = filtered.slice(start, end);

    return {
      options: paginated,
      hasMore: end < filtered.length,
    };
  };

  return (
    <Form form={form} onSubmit={(v) => alert(JSON.stringify(v, null, 2))}>
      <div className="max-w-md space-y-4">
        <SelectField<InfiniteFormValues>
          name="remoteModule"
          label="Phân hệ (Infinite Scroll & Search)"
          placeholder="Tìm kiếm và chọn phân hệ..."
          fetchData={fetchMockModules}
          defaultOptions={[
            { label: 'Cục Tiêu chuẩn - Đo lường - Chất lượng (Mặc định)', value: 'default-1' },
          ]}
        />
        <Button type="submit">Gửi dữ liệu</Button>
      </div>
    </Form>
  );
};

// ── Page ───────────────────────────────────────────────────────────────────────

export const FormDevPage = () => (
  <div className="min-h-screen w-full space-y-8 bg-background p-6">
    <DevBreadcrumb label="Form System" />
    <div className="space-y-1">
      <h1 className="text-heading-3 font-bold text-foreground">Form System</h1>
      <p className="text-body-1-rg text-muted-foreground">
        Hệ thống form tích hợp React Hook Form, xác thực Zod schema và toàn bộ các trường nhập liệu.
      </p>
    </div>

    <Section title="1. Basic Form">
      <BasicFormDemo />
    </Section>

    <Section title="2. Zod Validation">
      <ValidationFormDemo />
    </Section>

    <Section title="3. Date Field">
      <DateFieldDemo />
    </Section>

    <Section title="4. Switch & Radio Group">
      <ToggleFieldsDemo />
    </Section>

    <Section title="5. Full Combined Form">
      <FullFormDemo />
    </Section>

    <Section title="6. Multi-Select Field System">
      <div className="space-y-8 divide-y divide-neutral-150">
        <div className="space-y-4">
          <h3 className="text-title-3 text-neutral-800">
            Chế độ mặc định (Dạng text ở input, Dấu tích ở dropdown)
          </h3>
          <MultiSelectDemo />
        </div>
        <div className="space-y-4 pt-6">
          <h3 className="text-title-3 text-neutral-800">
            Chế độ Custom (Dạng Chip có nút X ở input, Hộp checkbox ở dropdown)
          </h3>
          <MultiSelectCustomDemo />
        </div>
        <div className="space-y-4 pt-6">
          <h3 className="text-title-3 text-neutral-800">Kiểm tra hợp lệ (Zod Schema Validation)</h3>
          <MultiSelectValidationDemo />
        </div>
      </div>
    </Section>

    <Section title="7. Infinite Scroll Select Field">
      <InfiniteScrollSelectDemo />
    </Section>

    <Section title="8. InputGlobalField System (React Hook Form + Formatting)">
      <InputGlobalFieldDemo />
    </Section>
  </div>
);

type InputGlobalFormValues = {
  keyword: string;
  amount: string;
  password: string;
};

const inputGlobalSchema = z.object({
  keyword: zRequired('Từ khóa là bắt buộc'),
  amount: zRequired('Số tiền là bắt buộc'),
  password: zRequired('Mật khẩu là bắt buộc').min(6, 'Mật khẩu tối thiểu 6 ký tự'),
});

const InputGlobalFieldDemo = () => {
  const form = useForm<InputGlobalFormValues>({
    resolver: zodResolver(inputGlobalSchema),
    defaultValues: { keyword: '', amount: '8000000', password: '' },
  });

  const formatCurrency = (val: string) => {
    if (!val) return '';
    const digits = val.replace(/\D/g, '');
    return digits ? new Intl.NumberFormat('vi-VN').format(Number(digits)) : '';
  };

  const parseCurrency = (val: string) => val.replace(/\D/g, '');

  return (
    <Form form={form} onSubmit={(v) => alert(JSON.stringify(v, null, 2))}>
      <div className="grid gap-4 sm:grid-cols-3">
        <InputGlobalField<InputGlobalFormValues>
          name="keyword"
          label="Từ khóa tìm kiếm"
          required
          prefixIcon={<SearchNormal1 size={18} />}
          clearable
          placeholder="Nhập từ khóa..."
        />
        <InputGlobalField<InputGlobalFormValues>
          name="amount"
          label="Số tiền thanh toán"
          required
          prefixIcon={<MoneySend size={18} />}
          formatDisplayValue={formatCurrency}
          parseRawValue={parseCurrency}
          suffix={<span className="text-body-3-sb text-muted-foreground">VNĐ</span>}
          placeholder="Nhập số tiền..."
        />
        <InputGlobalField<InputGlobalFormValues>
          name="password"
          label="Mật khẩu tài khoản"
          required
          type="password"
          showPasswordToggle
          prefixIcon={<Lock size={18} />}
          placeholder="Nhập mật khẩu..."
        />
      </div>
      <Button type="submit" className="mt-4">
        Gửi Form InputGlobal
      </Button>
    </Form>
  );
};
