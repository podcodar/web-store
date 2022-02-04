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
} from '@chakra-ui/react';

import CartItemsList from '@packages/components/CartItemsList';
import { useCartStates } from '@packages/features/cart-context';
import { images } from '@packages/config/site';

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
    fontSize: '16px',
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

export default function BuyerOrder() {
  const { cart } = useCartStates();

  return (
    <Stack direction="column" spacing="1em" marginBottom="5em">
      <Title>Finalize seu pedido</Title>

      <form>
        <Grid templateColumns={{ lg: '1fr 0.3fr' }} gap="0.5em">
          <GridItem>
            <Flex {...fieldsetStyle}>
              <Box w="full">
                <Stack>
                  <Stack direction="row" alignItems="center">
                    <H1>Endereço de entrega</H1>
                    <Link>Alterar</Link>
                  </Stack>
                  <Text>Thiago Pereira</Text>
                  <Text>Rua Menina Daniela 56</Text>
                  <Text>Centro</Text>
                  <Text>São João Evangelista - MG</Text>
                  <Text>39705-000</Text>
                  <Stack direction="row">
                    <Text>Telefone:</Text>
                    <Text>(33)98729-5254</Text>
                  </Stack>
                </Stack>
              </Box>
              <Box w="full">
                <Stack>
                  <Stack direction="row" alignItems="center">
                    <H1>Forma de pagamento</H1>
                  </Stack>
                  <Stack direction="row" alignItems="center">
                    <Image
                      src={images.pixLogo}
                      alt="Pix Logo"
                      width="32px"
                      height="32px"
                    />
                    <Text fontWeight="bold">PIX</Text>
                    <HelpText>Vencimento em até 1 hora</HelpText>
                  </Stack>
                </Stack>
              </Box>
            </Flex>

            <Box {...fieldsetStyle} marginTop="0.5em">
              <H1 marginBottom="1em">Itens do Pedido</H1>

              <CartItemsList
                items={cart.items}
                onQuantityChange={() => {}}
                onRemove={() => {}}
              />
            </Box>
          </GridItem>
          <GridItem>
            <Stack {...fieldsetStyle} direction="column" spacing="1em">
              <H1>Resumo do pedido</H1>
              <Flex justify="space-between">
                <Text fontWeight="bold">Subtotal:</Text>
                <Text>R$ 300,00</Text>
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
