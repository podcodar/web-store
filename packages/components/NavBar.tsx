import {
  Box,
  IconButton,
  Text,
  HStack,
  Spacer,
  Input,
  Icon,
  Image,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import {
  FaFacebook,
  FaInstagramSquare,
  FaLinkedin,
  FaGithub,
} from 'react-icons/fa';

import { Logo } from '@packages/components/icons';
import Link from '@packages/components/Link';
import { currencyFormat } from '@packages/utils/functions';
import { useCartStates } from '@packages/features/cart-context';

import { images, links } from '../config/site';

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
        display="flex"
        paddingTop={1}
        paddingRight={1}
        justifyContent="flex-end"
        alignItems="center"
        bgColor="first.150"
        w="100%"
        h="20%"
      >
        <Box display="flex" justifyContent="space-between" w="8%">
          <Link href="/">
            <Icon as={FaFacebook} w={5} h={5} color="first.450" />
          </Link>
          <Link href="/">
            <Icon as={FaInstagramSquare} w={5} h={5} color="first.450" />
          </Link>
          <Link href={links.linkedin}>
            <Icon as={FaLinkedin} w={5} h={5} color="first.450" />
          </Link>
          <Link href={links.github}>
            <Icon as={FaGithub} w={5} h={5} color="first.450" />
          </Link>
        </Box>
      </Box>
      <Box
        bgColor="first.200"
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
        bgColor="first.150"
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
