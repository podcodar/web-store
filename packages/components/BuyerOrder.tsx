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
import { useCartStates } from '@packages/features/cart-context';
import { images } from '@packages/config/site';

const fieldsetStyle: StyleProps = {
  border: '1px solid #ccc',
  padding: '1em',
  borderRadius: '0.3em',
};

const alignData: StyleProps = {
  textAlign: 'left',
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
            <Stack
              {...fieldsetStyle}
              spacing={{ base: '2em' }}
              direction={{ base: 'column', md: 'row' }}
            >
              <Box w="full">
                <Stack>
                  <HStack alignItems="center">
                    <H1>Endereço de entrega</H1>
                    <Link>Alterar</Link>
                  </HStack>
                  <Text {...alignData}>Thiago Pereira</Text>
                  <Text {...alignData}>Rua Menina Daniela 56</Text>
                  <Text {...alignData}>Centro</Text>
                  <Text {...alignData}>São João Evangelista - MG</Text>
                  <Text {...alignData}>39705-000</Text>
                  <HStack>
                    <Text>Telefone:</Text>
                    <Text>(33)98729-5254</Text>
                  </HStack>
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
            </Stack>

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
