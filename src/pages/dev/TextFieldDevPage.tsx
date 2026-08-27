import { useState } from 'react';

import { DevBreadcrumb } from '@/pages/dev/_DevBreadcrumb';
import { CodePreview } from '@/shared/components/ui/code-block';
import { Switch } from '@/shared/components/ui/switch';
import { TextField } from '@/shared/components/ui/text-field';

const demoTags = [
  { id: '1', label: 'Tag 1', tone: 'blue' as const },
  { id: '2', label: 'Tag 2', tone: 'green' as const },
  { id: '3', label: 'Tag 3', tone: 'rose' as const },
];

const states = [
  { label: 'Rest', props: { placeholder: 'Select date' as const } },
  { label: 'Active', props: { defaultValue: 'Select date' as const } },
  {
    label: 'Hover',
    props: { placeholder: 'Select date' as const, 'data-ui-hover': 'true' as const },
  },
  {
    label: 'Focus/Typing',
    props: { defaultValue: 'Select date' as const, 'data-ui-focus': 'true' as const },
  },
  {
    label: 'Error',
    props: {
      error: true as const,
      errorText: 'Error text' as const,
      defaultValue: 'Select date' as const,
    },
  },
  { label: 'Disabled', props: { disabled: true as const, placeholder: 'Select date' as const } },
  { label: 'View', props: { mode: 'view' as const, defaultValue: 'Select date' as const } },
];

const sizes = [
  { label: 'Large', size: 'large' as const },
  { label: 'Medium', size: 'medium' as const },
  { label: 'Small', size: 'small' as const },
  { label: 'Note', size: 'note' as const },
];

const MatrixCell = ({
  size,
  state,
}: {
  size: (typeof sizes)[number]['size'];
  state: (typeof states)[number];
}) => {
  const isNote = size === 'note';
  const isViewWithTags = state.label === 'View' && size === 'medium';
  const isActiveWithTags = state.label === 'Active' && size === 'medium';

  return (
    <TextField
      label="Label"
      required
      supportingText="Supporting text"
      showCalendarIcon={!isNote}
      size={size}
      tags={isViewWithTags || isActiveWithTags ? demoTags : undefined}
      labelSwitch={
        size === 'medium' && state.label === 'Rest' ? (
          <Switch aria-label="toggle field" defaultChecked />
        ) : size === 'small' && state.label === 'Rest' ? (
          <Switch aria-label="toggle field" defaultChecked />
        ) : undefined
      }
      switchPosition={size === 'small' && state.label === 'Rest' ? 'left' : 'right'}
      {...state.props}
    />
  );
};

const dateRangeStates = states.slice(0, 6);

const getDateRangeProps = (state: (typeof dateRangeStates)[number]) => {
  switch (state.label) {
    case 'Active':
      return { defaultStartValue: 'Start date', defaultEndValue: 'End date' };
    case 'Focus/Typing':
      return {
        defaultStartValue: 'Start date',
        defaultEndValue: 'End date',
        'data-ui-focus': 'true' as const,
      };
    case 'Hover':
      return { 'data-ui-hover': 'true' as const };
    case 'Error':
      return {
        error: true as const,
        errorText: 'Error text' as const,
        defaultStartValue: 'Start date',
        defaultEndValue: 'End date',
      };
    case 'Disabled':
      return { disabled: true as const };
    default:
      return {};
  }
};

export const TextFieldDevPage = () => {
  const [value, setValue] = useState('');
  const [tags, setTags] = useState(demoTags);

  return (
    <div className="min-h-screen w-full space-y-8 bg-background p-6">
      <DevBreadcrumb label="Text Field" />
      <div className="space-y-1">
        <h1 className="text-heading-3 font-bold text-foreground">Text Field</h1>
        <p className="text-body-1-rg text-muted-foreground">
          Trường nhập liệu hoàn chỉnh gồm nhãn, ghi chú, thẻ tag, chọn khoảng ngày và thông báo lỗi.
        </p>
      </div>

      {/* ── 1. Interactive Playground ── */}
      <CodePreview
        title="1. Thử nghiệm tương tác (Interactive Playground)"
        description="Các trạng thái nhập liệu, gắn tag và khoảng ngày."
        code={`import { TextField } from '@/shared/components/ui/text-field';

// 1. Text field cơ bản kèm nhãn & chú thích
<TextField
  label="Họ và tên"
  required
  placeholder="Nhập họ và tên..."
  supportingText="Tối đa 100 ký tự"
/>

// 2. Báo lỗi xác thực (Error state)
<TextField
  label="Email"
  required
  error
  errorText="Email không đúng định dạng"
  defaultValue="invalid-email"
/>

// 3. Gắn thẻ Tags
<TextField
  label="Kỹ năng"
  tags={[{ id: '1', label: 'React', tone: 'blue' }]}
  placeholder="Thêm kỹ năng..."
/>

// 4. Chọn khoảng ngày (Date Range variant)
<TextField
  variant="dateRange"
  label="Thời gian thực hiện"
  startPlaceholder="Từ ngày"
  endPlaceholder="Đến ngày"
/>`}
      >
        <div className="grid max-w-xl gap-6">
          <TextField
            label="Label"
            required
            supportingText="Supporting text"
            placeholder="Select date"
            showCalendarIcon
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
          <TextField
            label="Label"
            required
            error
            errorText="Error text"
            supportingText="Supporting text"
            defaultValue="Select date"
            showCalendarIcon
          />
          <TextField
            label="Label"
            required
            supportingText="Supporting text"
            size="medium"
            tags={tags}
            onRemoveTag={(id) => setTags((current) => current.filter((tag) => tag.id !== id))}
            placeholder="Select date"
            showCalendarIcon
          />
          <TextField
            variant="dateRange"
            label="Label"
            required
            supportingText="Supporting text"
            showCalendarIcon
            startPlaceholder="Start date"
            endPlaceholder="End date"
          />
        </div>
      </CodePreview>

      <section className="space-y-4">
        <h2 className="text-title-2 text-foreground">Single input</h2>
        <div className="overflow-x-auto rounded-lg border border-border bg-background p-4">
          <div className="min-w-[980px] space-y-6">
            <div className="grid grid-cols-[80px_repeat(7,minmax(140px,1fr))] gap-3">
              <div />
              {states.map((state) => (
                <p key={state.label} className="text-body-2-sb text-muted-foreground">
                  {state.label}
                </p>
              ))}
            </div>

            {sizes.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[80px_repeat(7,minmax(140px,1fr))] items-start gap-3"
              >
                <p className="pt-8 text-body-2-sb text-muted-foreground">{row.label}</p>
                {states.map((state) => (
                  <div key={`${row.label}-${state.label}`} className="min-w-[140px]">
                    <MatrixCell size={row.size} state={state} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-title-2 text-foreground">Date range</h2>
        <div className="overflow-x-auto rounded-lg border border-border bg-background p-4">
          <div className="min-w-[980px] space-y-6">
            <div className="grid grid-cols-[80px_repeat(6,minmax(140px,1fr))] gap-3">
              <div />
              {dateRangeStates.map((state) => (
                <p key={state.label} className="text-body-2-sb text-muted-foreground">
                  {state.label}
                </p>
              ))}
            </div>

            {(['large', 'medium', 'small'] as const).map((size) => (
              <div
                key={size}
                className="grid grid-cols-[80px_repeat(6,minmax(140px,1fr))] items-start gap-3"
              >
                <p className="pt-8 text-body-2-sb capitalize text-muted-foreground">{size}</p>
                {dateRangeStates.map((state) => (
                  <div key={`${size}-${state.label}`} className="min-w-[140px]">
                    <TextField
                      variant="dateRange"
                      label="Label"
                      required
                      supportingText="Supporting text"
                      showCalendarIcon
                      size={size}
                      startPlaceholder="Start date"
                      endPlaceholder="End date"
                      {...getDateRangeProps(state)}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
