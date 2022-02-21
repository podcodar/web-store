import { Button, ButtonProps } from '@chakra-ui/react';

import Styles from './Styles';

export default function Submit({ children, ...rest }: ButtonProps) {
  return (
    <Button {...rest} type="submit" sx={Styles.primaryButton}>
      {children}
    </Button>
  );
}
