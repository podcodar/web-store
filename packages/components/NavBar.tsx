import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Image,
  Link,
  Text,
} from '@chakra-ui/react';
import { useModalActions } from '@packages/features/modal-context';
import Logo from '@packages/icons/Logo';
import { createIcon } from '@chakra-ui/react';

export const GithubIcon = createIcon({
  displayName: 'GithubIcon',
  viewBox: '0 0 20 20',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <path
      fill="currentColor"
      d="M10 0a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69a3.6 3.6 0 0 1 .1-2.64s.84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.4.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85l-.01 2.75c0 .26.18.58.69.48A10 10 0 0 0 10 0"
    />
  ),
});

export const LinkedInIcon = createIcon({
  displayName: 'LinkedInIcon',
  viewBox: '0 0 24 24',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <path
      fill="currentColor"
      d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
    />
  ),
});

function NavBar() {
  const { open } = useModalActions();
  const menuItems = [
    <Link key="home" target="_blank" href="http://wiki.podcodar.com">
      Wiki
    </Link>,
    <Link
      key="home"
      target="_blank"
      href="https://github.com/podcodar/forum/discussions"
    >
      Fórum
    </Link>,
    <Link key="team" href="/team">
      Equipe
    </Link>,
    <Link key="github" target="_blank" href="https://github.com/podcodar">
      <GithubIcon />
    </Link>,
    <Link
      key="linkedin"
      target="_blank"
      href="https://www.linkedin.com/company/podcodar/"
    >
      <LinkedInIcon />
    </Link>,
    <Button
      key="cta"
      colorScheme={'purple'}
      bg={'purple.400'}
      _hover={{ bg: 'purple.500' }}
      onClick={open}
    >
      Join
    </Button>,
  ];

  return (
    <Container p="0.5rem" display="flex" maxW={'5xl'}>
      <Flex flex="1">
        <Link href="/" display="flex" alignItems="center">
          <Logo size="small" />
          <Text m="0 0.5rem" fontWeight="bold">
            PodCodar
          </Text>
        </Link>
      </Flex>
      <Grid
        gap="1rem"
        templateColumns={`repeat(${menuItems.length}, auto)`}
        alignItems="center"
      >
        {menuItems}
      </Grid>
    </Container>
  );
}

export default NavBar;
