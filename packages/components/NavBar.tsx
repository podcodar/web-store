import { Box, Text, HStack, Spacer, Image, Button } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';

import { Logo } from '@packages/components/icons';
import Link from '@packages/components/Link';
import { currencyFormat } from '@packages/utils/functions';
import { useCartStates } from '@packages/features/cart-context';

import { images } from '../config/site';

function NavBar() {
  const { cart } = useCartStates();

  let quantity = 0;
  let amount = 0;

  cart.items.forEach((item) => {
    quantity += item.quantity;
    amount += item.quantity * item.product.price;
  });

  return (
    <Box w="100%" h="24vh">
      <Box
        bgColor="first.250"
        w="100%"
        h="80%"
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
          <HStack spacing="1em">
            <Box>
              <Link href="https://podcodar.com/">
                <Button
                  bgColor="fifth.200"
                  _hover={{ bgColor: 'fifth.250' }}
                  rightIcon={<ArrowForwardIcon />}
                >
                  <Logo size="small" />
                  <Text marginLeft="8px">Conheça a PodCodar</Text>
                </Button>
              </Link>
            </Box>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Link href="/cart" position="relative">
                <Image
                  src={images.cart}
                  alt="Cart Image"
                  width="32px"
                  height="32px"
                />
                <Box
                  minW="10px"
                  h="15px"
                  position="absolute"
                  top="-7px"
                  left="105%"
                >
                  {quantity ? (
                    <Text
                      bgColor="red.500"
                      color="white"
                      padding="0px 3px 0px 2px"
                      fontSize="10px"
                    >
                      {quantity}
                    </Text>
                  ) : undefined}
                </Box>
              </Link>
              <Text w="7rem" textAlign="center" fontSize="12px">
                {currencyFormat(amount)}
              </Text>
            </Box>
          </HStack>
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgColor="first.200"
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
