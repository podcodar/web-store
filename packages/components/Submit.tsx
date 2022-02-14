import { Button, ButtonProps } from '@chakra-ui/react';

export default function Submit({ children, ...rest }: ButtonProps) {
  return (
    <Button
      {...rest}
      type="submit"
      bgColor="fifth.150"
      _hover={{
        bgColor: 'fifth.250',
      }}
    >
      {children}
    </Button>
  );
}
