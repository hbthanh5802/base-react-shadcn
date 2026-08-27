import { forwardRef, useEffect, useState } from 'react';

import { Input } from '@/shared/components/ui/input';
import { useDebounce } from '@/shared/hooks';

interface DebounceInputProps extends Omit<React.ComponentProps<'input'>, 'onChange'> {
  debounceTime?: number;
  onChange?: (value: string) => void;
}

const DebounceInput = forwardRef<HTMLInputElement, DebounceInputProps>((props, ref) => {
  const { debounceTime = 0, onChange, ...rest } = props;
  const [inputValue, setInputValue] = useState('');
  const debouncedInputValue = useDebounce(inputValue, debounceTime);

  useEffect(() => {
    if (onChange) {
      onChange(debouncedInputValue);
    }
  }, [debouncedInputValue]);

  return (
    <Input ref={ref} {...rest} value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
  );
});

DebounceInput.displayName = 'DebounceInput';
export default DebounceInput;
