import { Container } from '@chakra-ui/react';
import { ReactNode } from 'react';

import NavBar from './NavBar';

interface Props {
  children: ReactNode;
}

function Layout({ children }: Props) {
  return (
    <div>
      <NavBar />
      <Container maxW="5xl" my="5rem">
        {children}
      </Container>
    </div>
  );
}

export default Layout;
