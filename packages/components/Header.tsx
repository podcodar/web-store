import { Box, Text, HStack, Flex } from '@chakra-ui/react';

import { Logo } from '@packages/components/icons';

export default function Header() {
  return (
    <Flex width="100%" height="100px" bgColor="gray.300" flexDirection="column">
      <Flex height="20%">Minha conta</Flex>
      <Flex width="90%" height="100%">
        <HStack
          display="flex"
          alignItems="center"
          justifyContent="space-around"
          paddingLeft={10}
          spacing="10px"
        >
          <Flex>
            <Box>
              <Logo size="default" />
            </Box>
            <Box>
              <Text as="h1">Header</Text>
            </Box>
          </Flex>
          <Flex>
            <Text>Texto</Text>
          </Flex>
        </HStack>
      </Flex>
      <Flex height="20%">Minha conta</Flex>
    </Flex>
  );
}
