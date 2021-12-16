import { Box, IconButton, Text, HStack, Spacer, Input } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import Image from 'next/image';

import { Logo, GithubIcon, LinkedInIcon } from '@packages/components/icons';
import Link from '@packages/components/Link';

import cartImage from '../assets/cart.png';

function NavBar() {
  return (
    <Box w="100%" h="24vh">
      <Box
        display="flex"
        padding={[0, 2]}
        justifyContent="flex-end"
        alignItems="center"
        bgColor="gray.100"
        w="100%"
        h="20%"
      >
        <HStack>
          <Box>
            <GithubIcon />
          </Box>
          <Box>
            <LinkedInIcon />
          </Box>
        </HStack>
      </Box>
      <Box
        bgColor="gray.200"
        w="100%"
        h="60%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box w="85%" display="flex">
          <HStack>
            <Box>
              <Logo />
            </Box>
            <Box>
              <Text fontWeight="bold">PodCodar Store</Text>
            </Box>
          </HStack>
          <Spacer />
          <HStack>
            <Box>
              <Input bgColor="white" />
            </Box>
            <Box>
              <IconButton aria-label="Search" icon={<SearchIcon />} />
            </Box>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Image src={cartImage} alt="Cart Image" width={32} height={32} />
              <Text fontSize="12px">10 itens</Text>
              <Text fontSize="12px">R$ 100,00</Text>
            </Box>
          </HStack>
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgColor="gray.200"
        w="100%"
        h="20%"
      >
        <Box w="85%">
          <HStack>
            <Link href="/">Home</Link> <Text>|</Text>
            <Link href="/">Sobre</Link> <Text>|</Text>
            <Link href="/">Fale Conosco</Link>
          </HStack>
        </Box>
      </Box>
    </Box>
  );
}

export default NavBar;
