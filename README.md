# Base Frontend Starter Project

Dự án frontend cơ sở (**Clean Frontend Boilerplate**) hoàn chỉnh, chuẩn hóa UI/UX, hỗ trợ đầy đủ các thành phần giao diện, Form Engine type-safe, Theme Sáng/Tối, Mock Authentication và Router tối giản.

---

## 📑 Mục lục

1. [🛠️ Công nghệ sử dụng](#️-công-nghệ-sử-dụng)
2. [🚀 Hướng dẫn khởi chạy](#-hướng-dẫn-khởi-chạy)
3. [🌓 Cơ chế Theme Sáng / Tối (Dark & Light Mode)](#-cơ-chế-theme-sáng--tối-dark--light-mode)
4. [🎨 Hệ thống Màu sắc & Hướng dẫn tùy biến Palette](#-hệ-thống-màu-sắc--hướng-dẫn-tùy-biến-palette)
5. [🔐 Mock Authentication & Kết nối Backend](#-mock-authentication--kết-nối-backend)
6. [🛣️ Quản lý Router & Phân quyền (Protected Routes)](#️-quản-lý-router--phân-quyền-protected-routes)
7. [📝 Hướng dẫn sử dụng Form Engine (RHF + Zod)](#-hướng-dẫn-sử-dụng-form-engine-rhf--zod)
8. [📊 Hướng dẫn sử dụng Bảng dữ liệu (TanStack Table)](#-hướng-dẫn-sử-dụng-bảng-dữ-liệu-tanstack-table)
9. [📁 Cấu trúc thư mục](#-cấu-trúc-thư-mục)

---

## 🛠️ Công nghệ sử dụng

- **Core**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, CSS Variables / Design Tokens, Lucide & Iconsax Icons
- **UI Components**: Radix UI Primitives, ~40+ Custom Components (Button, Modal, DatePicker, Select, Table...)
- **Form Engine**: React Hook Form + Zod Schema Validation
- **State Management**: Zustand (kèm Encrypted Persistent Storage)
- **Server State & Data Fetching**: TanStack Query (React Query v5), Axios
- **Routing**: React Router DOM v6
- **Notifications**: Sonner Toaster, Custom Confirm Dialog
- **Internationalization**: React i18next

---

## 🚀 Hướng dẫn khởi chạy

### 1. Cài đặt dependencies
```bash
npm install
```

### 2. Chạy môi trường Development
```bash
npm run dev
```
Ứng dụng sẽ chạy tại: `http://localhost:3000`

### 3. Kiểm tra kiểu dữ liệu (Type check) & Build Production
```bash
# Kiểm tra TypeScript
npm run type-check

# Build ra thư mục dist/
npm run build

# Preview bản build
npm run preview
```

---

## 🌓 Cơ chế Theme Sáng / Tối (Dark & Light Mode)

Dự án hỗ trợ 3 chế độ: `light` (Sáng), `dark` (Tối), và `system` (Tự động theo hệ điều hành).

### Cách hoạt động
1. **Lưu trữ**: Trạng thái Theme được lưu trong `localStorage` qua Zustand store (`useUIStore`).
2. **Provider**: `ThemeProvider` trong `src/shared/components/theme-provider.tsx` sẽ tự động thêm/xóa class `.dark` tại thẻ `<html>`.
3. **CSS Variables**: Các màu sắc nền, chữ, viền sẽ tự động thay đổi theo biến CSS tương ứng khi class `.dark` được kích hoạt.

### Cách sử dụng Hook `useTheme` trong Component
```tsx
import { useTheme } from '@/shared/components/theme-provider';

export const MyComponent = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Giao diện hiện tại: {theme} (Click để đổi)
    </button>
  );
};
```

---

## 🎨 Hệ thống Màu sắc & Hướng dẫn tùy biến Palette

Hệ thống màu được đồng bộ giữa **CSS Variables (src/index.css)** và **Tailwind Config (tailwind.config.ts)**.

### 1. Cấu trúc màu trong `src/index.css`
Được định nghĩa dưới dạng HSL (không có dấu phẩy) để hỗ trợ tính năng thay đổi độ trong suốt `bg-primary/80` của Tailwind:

```css
@layer base {
  :root {
    /* Chế độ Sáng */
    --background: 0 0% 97.6%;       /* Màu nền trang */
    --foreground: 0 0% 6%;          /* Màu chữ chính */
    --card: 0 0% 100%;              /* Màu nền thẻ Card */
    --border: 0 0% 87%;             /* Màu đường viền */
    --primary: 349 100% 47%;        /* Màu chủ đạo (Brand Color) */
    --primary-foreground: 0 0% 100%;
  }

  .dark {
    /* Chế độ Tối */
    --background: 0 0% 6%;          /* Màu nền tối */
    --foreground: 0 0% 98%;         /* Màu chữ sáng */
    --card: 0 0% 10%;
    --border: 0 0% 23%;
    --primary: 349 100% 47%;
    --primary-foreground: 0 0% 100%;
  }
}
```

### 2. Cấu trúc màu trong `tailwind.config.ts`
Chứa các dải màu từ `25` đến `950` cho các nhóm:
- `primary`: Màu thương hiệu (mặc định là dải màu Đỏ tươi `#EE0033`).
- `neutral`: Màu xám trung tính cho text, border, surface.
- `success` (Xanh lá), `warning` (Cam vàng), `error` / `destructive` (Đỏ).

### 3. Hướng dẫn đổi màu chủ đạo (Ví dụ: Đổi sang Xanh Dương `#0066FF`)

#### Bước 1: Sửa biến `--primary` trong `src/index.css`
Chuyển mã Hex `#0066FF` sang HSL (`216 100% 50%`):
```css
/* src/index.css */
:root {
  --primary: 216 100% 50%;
  --ring: 216 100% 50%;
}
.dark {
  --primary: 216 100% 50%;
  --ring: 216 100% 50%;
}
```

#### Bước 2: Cập nhật dải màu `primary` trong `tailwind.config.ts`
```ts
// tailwind.config.ts
const primary = {
  25: '#F0F6FF',
  50: '#E0EDFF',
  100: '#C2DCFF',
  200: '#99C4FF',
  300: '#66A5FF',
  400: '#3385FF',
  500: '#0A66FF',
  600: '#0052CC', // Màu chính
  700: '#003D99',
  800: '#002966',
  900: '#001433',
  950: '#000A1A',
};
```

---

## 🔐 Mock Authentication & Kết nối Backend

### 1. Mock Auth (Hiện tại)
Trạng thái xác thực được quản lý tại `src/shared/stores/auth.store.ts`:
- Hàm `loginMock({ username, role })`: Tự động tạo token giả lập và phân quyền (`SYSTEM_ADMIN` hoặc `USER`).
- Hàm `logout()`: Xóa sạch session và đưa người dùng về trang `/login`.

### 2. Chuyển đổi sang Backend API thật
Khi có API Backend, bạn chỉ cần thực hiện 2 bước:

1. **Cập nhật URL API**: Đổi `VITE_API_URL` trong file `.env`:
   ```env
   VITE_API_URL=https://api.yourdomain.com/v1
   ```
2. **Cập nhật hàm login thật trong `src/shared/stores/auth.store.ts`**:
   ```ts
   // Thay vì set state giả lập, gọi API backend:
   login: async (credentials) => {
     const res = await http.post<LoginResponse>('/auth/login', credentials);
     set({
       user: res.data.user,
       accessToken: res.data.accessToken,
       refreshToken: res.data.refreshToken,
       isAuthenticated: true,
     });
   }
   ```
   > 💡 **Lưu ý**: File `src/shared/lib/axios.ts` đã được cấu hình sẵn Interceptor để tự động đính kèm `Authorization: Bearer <accessToken>` vào tất cả request và tự động logout khi nhận HTTP `401 Unauthorized`.

---

## 🛣️ Quản lý Router & Phân quyền (Protected Routes)

Cấu hình Router tập trung tại `src/app/router.tsx`.

### Cách thêm một Trang mới có bảo vệ:
```tsx
// src/app/router.tsx
{
  element: (
    <ProtectedRoute allowedRoles={['SYSTEM_ADMIN']}>
      <MainLayout />
    </ProtectedRoute>
  ),
  children: [
    { path: 'dashboard', element: <HomePage /> },
    { path: 'users', element: <UserManagementPage /> }, // <-- Trang mới của bạn
  ],
}
```

Và thêm liên kết vào menu tại `src/layouts/components/Sidebar.tsx`.

---

## 📝 Hướng dẫn sử dụng Form Engine (RHF + Zod)

Template tích hợp sẵn Form Engine mạnh mẽ, type-safe giữa **React Hook Form** và **Zod**.

### Ví dụ tạo Form:
```tsx
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, TextField, SelectField, DateField, CheckboxField } from '@/shared/components/form';
import { Button } from '@/shared/components/ui/button';

// 1. Khai báo Schema Validate
const userSchema = z.object({
  fullName: z.string().min(1, 'Họ tên không được để trống'),
  email: z.string().email('Email không hợp lệ'),
  role: z.string().min(1, 'Vui lòng chọn vai trò'),
  birthDate: z.string().optional(),
  isActive: z.boolean().default(true),
});

type UserFormValues = z.infer<typeof userSchema>;

export const CreateUserForm = () => {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: { fullName: '', email: '', role: '', isActive: true },
  });

  const onSubmit = (data: UserFormValues) => {
    console.log('Form data:', data);
  };

  return (
    <Form form={form} onSubmit={onSubmit} className="space-y-4 max-w-md">
      <TextField<UserFormValues> name="fullName" label="Họ và tên" placeholder="Nguyễn Văn A" required />
      <TextField<UserFormValues> name="email" label="Email" placeholder="example@domain.com" required />
      <SelectField<UserFormValues>
        name="role"
        label="Vai trò"
        options={[
          { label: 'Quản trị viên', value: 'ADMIN' },
          { label: 'Người dùng', value: 'USER' },
        ]}
        required
      />
      <DateField<UserFormValues> name="birthDate" label="Ngày sinh" />
      <CheckboxField<UserFormValues> name="isActive" label="Kích hoạt tài khoản ngay" />

      <Button type="submit" variant="default">Lưu thông tin</Button>
    </Form>
  );
};
```

---

## 📊 Hướng dẫn sử dụng Bảng dữ liệu (TanStack Table)

Template hỗ trợ component `TanstackTable` mạnh mẽ với phân trang, tìm kiếm và sắp xếp.

### Ví dụ tạo Table:
```tsx
import { type ColumnDef } from '@tanstack/react-table';
import { TanstackTable } from '@/shared/components/ui/tanstack-table';
import { useDataTableState } from '@/shared/hooks/useDataTableState';

interface UserItem {
  id: string;
  name: string;
  email: string;
}

const columns: ColumnDef<UserItem>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'name', header: 'Họ tên' },
  { accessorKey: 'email', header: 'Email' },
];

export const UserTable = () => {
  const { tableState, setState } = useDataTableState();

  const mockData: UserItem[] = [
    { id: '1', name: 'Nguyễn Văn A', email: 'a@gmail.com' },
    { id: '2', name: 'Trần Thị B', email: 'b@gmail.com' },
  ];

  return (
    <TanstackTable
      columns={columns}
      data={mockData}
      total={mockData.length}
      pageCount={1}
      onStateChange={(newState) => setState('page', newState.page)}
    />
  );
};
```

---

## 📁 Cấu trúc thư mục

```text
base-template/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── src/
│   ├── app/
│   │   ├── providers.tsx      # QueryClient, Theme, Toast, Confirm providers
│   │   └── router.tsx         # Cấu hình Router tập trung
│   ├── assets/                # Hình ảnh, icons tĩnh
│   ├── layouts/
│   │   ├── MainLayout.tsx     # Layout chính (Header + Sidebar + Outlet)
│   │   └── components/        # Header, Sidebar, UserMenu, ThemeToggle
│   ├── pages/
│   │   ├── auth/              # Trang Đăng nhập Mock
│   │   ├── dashboard/         # Trang chủ / Dashboard mẫu
│   │   ├── dev/               # Trang tham khảo & mẫu của toàn bộ UI Components
│   │   └── error/             # 403, 404, ErrorPage
│   └── shared/
│       ├── components/
│       │   ├── ui/            # ~40+ UI components
│       │   ├── form/          # Form Engine (TextField, SelectField, DateField...)
│       │   ├── ProtectedRoute.tsx
│       │   └── theme-provider.tsx
│       ├── hooks/             # Custom hooks (useDisclosure, useMediaQuery, useDataTableState...)
│       ├── lib/               # axios, storage, crypto, dayjs, toast, zod
│       ├── stores/            # Zustand stores (auth.store, ui.store)
│       └── types/             # TypeScript interfaces & types
```

---

## 🎯 Danh sách trang Demo UI Components có sẵn

Khởi chạy dự án và truy cập thanh menu bên trái để xem cách sử dụng thực tế của từng component:
- **Tất cả components**: `/dev`
- **Nút bấm (Buttons)**: `/dev/button`
- **Form & Input Fields**: `/dev/form`
- **Bảng dữ liệu (TanStack Table)**: `/dev/tanstack-table`
- **Hộp thoại (Dialog / Modal)**: `/dev/dialog`
- **Chọn ngày tháng (Date Picker)**: `/dev/date-picker`
- **Huy hiệu (Badges)**: `/dev/badge`
- **Thẻ nội dung (Cards)**: `/dev/card`
- **Tabs điều hướng**: `/dev/tabs`
