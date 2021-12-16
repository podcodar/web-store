import { Box } from '@chakra-ui/layout';
import { ReactNode } from 'react';

import Header from './Header';

interface Props {
  children: ReactNode;
}

function Layout({ children }: Props) {
  return (
    <Box>
      <Header />
      {children}
    </Box>
  );
}

export default Layout;
