import { Input, InputProps } from '@chakra-ui/react';
import { ChangeEvent, useRef } from 'react';

export function phoneMask(value: string): string {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{1,2})/, '($1)')
    .replace(/(\d{4,5})/, '$1-');
}

export function cpfMask(value: string): string {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})/, '$1.')
    .replace(/(\d{3}\.\d{3})/, '$1.')
    .replace(/(\d{3}\.\d{3}\.\d{3})/, '$1-');
}

interface Props extends InputProps {
  mask: (value: string) => string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function InputMask({ mask, onChange, ...rest }: Props) {
  const maskRef = useRef(true);

  const _onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (maskRef.current) {
      e.target.value = mask(e.target.value);
      onChange(e);
      return;
    }

    onChange(e);
  };

  return (
    <Input
      {...rest}
      onChange={_onChange}
      onKeyDown={(e) => (maskRef.current = e.key !== 'Backspace')}
    />
  );
}
