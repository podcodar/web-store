import { Box, Text, Stack, Spacer, Image, Button } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';

import { Logo } from '@packages/components/icons';
import Link from '@packages/components/Link';
import { currencyFormat, calculateDiscount } from '@packages/utils/functions';
import { useCartStates } from '@packages/features/cart-context';

import { images } from '../config/site';

function NavBar() {
  const { cart } = useCartStates();

  let quantity = 0;
  let amount = 0;

  cart.items.forEach((item) => {
    const discountPrice = calculateDiscount(item.product);
    quantity += item.quantity;
    amount += item.quantity * discountPrice;
  });

  return (
    <Box w="100%">
      <Box
        bgColor="first.250"
        w="100%"
        h={{ base: '15em', md: '7em' }}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Stack w="85%" spacing="10px" direction={{ base: 'column', md: 'row' }}>
          <Link href="/">
            <Stack
              direction={{ base: 'column', md: 'row' }}
              justifyContent="center"
              alignItems="center"
            >
              <Box>
                <Logo />
              </Box>
              <Box>
                <Text fontWeight="bold">PodCodar Store</Text>
              </Box>
            </Stack>
          </Link>
          <Spacer />
          <Stack
            spacing="1em"
            direction={{ base: 'column', md: 'row' }}
            justifyContent="center"
            alignItems="center"
          >
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
                  width="37px"
                  height="37px"
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
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}

export default NavBar;
