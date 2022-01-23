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
  onMask: (text: string) => void;
}

export default function InputMask({ mask, onMask, ...rest }: Props) {
  const maskRef = useRef(true);

  const _onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (maskRef.current) {
      onMask(mask(e.target.value));
      return;
    }

    onMask(e.target.value);
  };

  return (
    <Input
      {...rest}
      onChange={_onChange}
      onKeyDown={(e) => (maskRef.current = e.key !== 'Backspace')}
    />
  );
}
