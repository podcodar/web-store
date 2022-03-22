import { FormEvent } from 'react';
import {
  Stack,
  Text as ChackraText,
  Link as ChackraLink,
  StyleProps,
  Box,
  Flex,
  Grid,
  GridItem,
  chakra,
  Image,
  HStack,
} from '@chakra-ui/react';

import CartItemsList from '@packages/components/CartItemsList';
import { useCartActions, useCartStates } from '@packages/features/cart-context';
import { images } from '@packages/config/site';
import { useOrderStates } from '@packages/features/order-context';
import { calculateDiscount, currencyFormat } from '@packages/utils/functions';
import ICartItem from '@packages/entities/ICartItem';
import { DeliveryType } from '@packages/enums/DeliveryType';

import DeliveryInfo from './DeliveryInfo';
import Submit from './Submit';

const fieldsetStyle: StyleProps = {
  border: '1px solid #ccc',
  padding: '1em',
  borderRadius: '0.3em',
};

const Title = chakra(ChackraText, {
  baseStyle: {
    marginTop: '1em',
    fontSize: '25px',
    fontWeight: 'bold',
    color: 'black',
  },
});

const Text = chakra(ChackraText, {
  baseStyle: {
    fontSize: '14px',
    color: 'gray.600',
  },
});

const HelpText = chakra(ChackraText, {
  baseStyle: {
    fontSize: '12px',
    color: 'gray.500',
  },
});

const H1 = chakra(ChackraText, {
  baseStyle: {
    fontWeight: 'bold',
    fontSize: '19px',
    color: 'gray.600',
  },
});

const Link = chakra(ChackraLink, {
  baseStyle: {
    color: 'blue.500',
    bgColor: 'transparent',
    fontSize: '11px',
    fontWeight: 'bold',
  },
});

const API = '/api/order';
const mRequest = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: '',
};

interface Props {
  onPrev: () => void;
  onNext: () => void;
}

export default function BuyerOrder({ onPrev, onNext }: Props) {
  const { order } = useOrderStates();
  const { cart } = useCartStates();
  const { setCart } = useCartActions();

  const removeFromCart = (carItem: ICartItem) => {
    const items: ICartItem[] = [];

    cart.items.forEach((item) => {
      if (item.product.id !== carItem.product.id) {
        items.push({ ...item });
      }
    });

    setCart({ ...cart, items });
  };

  const quantityChange = (carItem: ICartItem, quantity: number) => {
    const items = [...cart.items];
    const item = items.find(
      (curItem) => curItem.product.id === carItem.product.id,
    );

    if (item) {
      item.quantity = quantity;
      setCart({ ...cart, items });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();

      const data = { order, items: cart.items };
      mRequest.body = JSON.stringify(data);

      const response = await fetch(API, mRequest);
      const result = await response.json();

      if (result.error) {
        throw new Error(result.error);
      }

      setCart({ ...cart, items: [] });
      onNext();
    } catch (error) {
      console.error('Error on Submit Form: ', error);
    }
  };
  let amount = 0;
  let originalPrice = 0;
  let discount = 0;
  cart.items.forEach((item) => {
    amount += calculateDiscount(item.product) * item.quantity;
    originalPrice += item.product.price * item.quantity;
    discount += item.product.discount;
  });

  return (
    <Stack direction="column" spacing="1em" marginBottom="5em">
      <Title>Finalize seu pedido</Title>

      <form onSubmit={handleSubmit}>
        <Grid templateColumns={{ lg: '1fr 0.3fr' }} gap="0.5em">
          <GridItem>
            <Stack
              sx={fieldsetStyle}
              spacing={{ base: '2em' }}
              direction={{ base: 'column', md: 'row' }}
            >
              <Box w="full">
                <Stack spacing="1em">
                  <Box>
                    <HStack alignItems="center">
                      <H1>Forma de envio</H1>
                      <Link onClick={onPrev}>Alterar</Link>
                    </HStack>
                    <Text textAlign="left">{order.delivery?.type}</Text>
                  </Box>

                  {order.delivery?.type === DeliveryType.MAIL && (
                    <DeliveryInfo order={order} />
                  )}
                </Stack>
              </Box>
              <Box w="full">
                <Stack spacing="2em">
                  <Box>
                    <H1 textAlign="left">Forma de pagamento</H1>
                    <HStack alignItems="center">
                      <Image
                        src={images.pixLogo}
                        alt="Pix Logo"
                        width="32px"
                        height="32px"
                      />
                      <Text fontWeight="bold">PIX</Text>
                    </HStack>
                  </Box>
                </Stack>
              </Box>
            </Stack>

            <Box sx={fieldsetStyle} marginTop="0.5em">
              <H1 marginBottom="1em">Itens do Pedido</H1>

              <CartItemsList
                items={cart.items}
                onQuantityChange={quantityChange}
                onRemove={removeFromCart}
              />
            </Box>
          </GridItem>
          <GridItem>
            <Stack sx={fieldsetStyle} direction="column" spacing="1em">
              <H1>Resumo do pedido</H1>
              <Flex justify="space-between">
                <Text fontWeight="bold">Subtotal:</Text>
                <HStack>
                  {discount > 0 && (
                    <Text textDecoration="line-through">
                      {currencyFormat(originalPrice)}
                    </Text>
                  )}
                  <Text>{currencyFormat(amount)}</Text>
                </HStack>
              </Flex>

              <HelpText textAlign="center">
                O frete será informado pelo vendedor
              </HelpText>

              <Submit disabled={cart.items.length === 0}>
                Finalizar Compra
              </Submit>
            </Stack>
          </GridItem>
        </Grid>
      </form>
    </Stack>
  );
}
