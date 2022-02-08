import {
  Stack,
  Text as ChackraText,
  Link as ChackraLink,
  StyleProps,
  Box,
  Flex,
  Button,
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
import { currencyFormat } from '@packages/utils/functions';
import ICartItem from '@packages/entities/ICartItem';

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

const H2 = chakra(ChackraText, {
  baseStyle: {
    fontSize: '13px',
    color: 'gray.600',
    fontWeight: 'bold',
    textAlign: 'left',
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

interface Props {
  onPrev: () => void;
}

export default function BuyerOrder({ onPrev }: Props) {
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

  let amount = 0;
  cart.items.forEach((item) => {
    amount += item.product.price * item.quantity;
  });

  return (
    <Stack direction="column" spacing="1em" marginBottom="5em">
      <Title>Finalize seu pedido</Title>

      <form>
        <Grid templateColumns={{ lg: '1fr 0.3fr' }} gap="0.5em">
          <GridItem>
            <Stack
              {...fieldsetStyle}
              spacing={{ base: '2em' }}
              direction={{ base: 'column', md: 'row' }}
            >
              <Box w="full">
                <HStack alignItems="center">
                  <H1>Endereço de entrega</H1>
                  <Link onClick={onPrev}>Alterar</Link>
                </HStack>

                <Grid
                  templateColumns="0.3fr 1fr"
                  rowGap="0.1em"
                  marginTop="5px"
                >
                  <GridItem>
                    <H2>Nome:</H2>
                  </GridItem>
                  <GridItem>
                    <Text textAlign="left">{order.buyer?.name}</Text>
                  </GridItem>

                  <GridItem>
                    <H2>Endereço:</H2>
                  </GridItem>
                  <GridItem>
                    <Text textAlign="left">
                      {`${order.delivery?.address.address} ${order.delivery?.address.number}`}
                    </Text>
                  </GridItem>

                  <GridItem>
                    <H2>Bairro:</H2>
                  </GridItem>
                  <GridItem>
                    <Text textAlign="left">
                      {order.delivery?.address.district}
                    </Text>
                  </GridItem>

                  <GridItem>
                    <H2>Compl.:</H2>
                  </GridItem>
                  <GridItem>
                    <Text textAlign="left">
                      {order.delivery?.address.complement}
                    </Text>
                  </GridItem>

                  <GridItem>
                    <H2>Cidade:</H2>
                  </GridItem>
                  <GridItem>
                    <Text textAlign="left">
                      {`${order.delivery?.address.city} - ${order.delivery?.address.uf}`}
                    </Text>
                  </GridItem>

                  <GridItem>
                    <H2>Cep:</H2>
                  </GridItem>
                  <GridItem>
                    <Text textAlign="left">{order.delivery?.address.cep}</Text>
                  </GridItem>

                  <GridItem>
                    <H2>Telefone:</H2>
                  </GridItem>
                  <GridItem>
                    <Text>{order.buyer?.phone}</Text>
                  </GridItem>
                </Grid>
              </Box>
              <Box w="full">
                <Stack spacing="2em">
                  <Box>
                    <H1>Forma de pagamento</H1>
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

                  <Box>
                    <HStack alignItems="center">
                      <H1>Forma de envio</H1>
                      <Link onClick={onPrev}>Alterar</Link>
                    </HStack>
                    <Text>{order.delivery?.type}</Text>
                  </Box>
                </Stack>
              </Box>
            </Stack>

            <Box {...fieldsetStyle} marginTop="0.5em">
              <H1 marginBottom="1em">Itens do Pedido</H1>

              <CartItemsList
                items={cart.items}
                onQuantityChange={quantityChange}
                onRemove={removeFromCart}
              />
            </Box>
          </GridItem>
          <GridItem>
            <Stack {...fieldsetStyle} direction="column" spacing="1em">
              <H1>Resumo do pedido</H1>
              <Flex justify="space-between">
                <Text fontWeight="bold">Subtotal:</Text>
                <Text>{currencyFormat(amount)}</Text>
              </Flex>

              <HelpText textAlign="center">
                O frete será informado pelo vendedor
              </HelpText>

              <Button type="submit" bgColor="fifth.300">
                Finalizar Compra
              </Button>
            </Stack>
          </GridItem>
        </Grid>
      </form>
    </Stack>
  );
}
