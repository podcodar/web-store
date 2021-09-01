import {
  Box,
  Button,
  Container,
  IconButton,
  Flex,
  Divider,
  Stack,
  Link,
  Text,
  useDisclosure,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

import { GithubIcon, LinkedInIcon } from '@packages/assets/icons';
import { Logo } from '@packages/assets/icons/Logo';
import { useModalActions } from '@packages/features/modal-context';

import ToggleThemeButton from './ToggleThemeButton';

const communityLinks = [
  <Link key="wiki" target="_blank" href="http://wiki.podcodar.com">
    Wiki
  </Link>,
  <Link
    key="forum"
    target="_blank"
    href="https://github.com/podcodar/forum/discussions"
  >
    Fórum
  </Link>,
  <Link key="team" href="/team">
    Equipe
  </Link>,
];

const actionButtons = [
  <Link
    key="github"
    target="_blank"
    href="https://github.com/podcodar"
    gridColumnStart="2"
    justifySelf="end"
  >
    <GithubIcon />
  </Link>,
  <Link
    key="linkedin"
    target="_blank"
    href="https://www.linkedin.com/company/podcodar/"
    gridColumnStart="3"
  >
    <LinkedInIcon />
  </Link>,
  <ToggleThemeButton key="toggle-theme" />,
];

function NavBar() {
  const { open } = useModalActions();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navbarBgColor = useColorModeValue('gray.50', 'gray.900');

  return (
    <Box
      position="fixed"
      w="100%"
      top={0}
      shadow="base"
      zIndex={1}
      bg={navbarBgColor}
    >
      <Container p="0.5rem" display="flex" maxW="5xl">
        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ sm: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />

        <Link
          href="/"
          display="flex"
          alignItems="center"
          justifyContent="center"
          w={{ base: '100%', sm: 'auto' }}
        >
          <Logo size="small" />
          <Text m="0 0.5rem" fontWeight="bold">
            PodCodar
          </Text>
        </Link>

        <Flex
          w="100%"
          justifyContent="space-between"
          alignItems="center"
          p=" 0 1rem"
          d={{ base: 'none', sm: 'flex' }}
        >
          <Box>
            <HStack spacing="1rem">{communityLinks}</HStack>
          </Box>
          <HStack spacing="1rem" fontSize="1.2rem">
            {actionButtons}
          </HStack>
        </Flex>

        <Button
          key="cta"
          colorScheme="purple"
          bg="purple.400"
          _hover={{ bg: 'purple.500' }}
          onClick={open}
        >
          Join
        </Button>
      </Container>

      {isOpen ? (
        <Box
          px={2}
          display={{ sm: 'none' }}
          backgroundColor={navbarBgColor}
          paddingBottom="0.5rem"
        >
          <Stack as="nav" spacing={4} m={4}>
            {communityLinks}
          </Stack>
          <Divider />
          <HStack
            py={2}
            spacing="1rem"
            justifyContent="center"
            fontSize="1.3rem"
          >
            {actionButtons}
          </HStack>
        </Box>
      ) : null}
    </Box>
  );
}

export default NavBar;
