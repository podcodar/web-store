import { Box, Button, Center, Text, VStack } from '@chakra-ui/react';

import ICartItem from '@packages/entities/ICartItem';
import { currencyFormat } from '@packages/utils/functions';

interface Props {
  items: ICartItem[];
}

export function CartResume({ items = [] }: Props) {
  let amount = 0;

  items.forEach((item) => {
    amount += item.product.price * item.quantity;
  });

  return (
    <Box w={{ lg: '15%' }}>
      <Center>
        <VStack>
          <Box>
            <Text fontSize="15px" fontWeight="bold" textTransform="uppercase">
              Total à Pagar
            </Text>
            <Text fontSize="15px" textAlign="center">
              {currencyFormat(amount)}
            </Text>
          </Box>
          <Button bgColor="fifth.150" _hover={{ bgColor: 'fifth.250' }}>
            Finalizar Compra
          </Button>
        </VStack>
      </Center>
    </Box>
  );
}

export default function CartResume2({ items = [] }: Props) {
  let amount = 0;

  items.forEach((item) => {
    amount += item.product.price * item.quantity;
  });

  return (
    <Box
      w={{ base: 'auto', lg: '16em' }}
      borderLeft={{ lg: '1px' }}
      borderLeftColor={{ lg: 'gray.200' }}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <VStack>
        <Text fontSize="15px">
          Subtotal ({items.length} {items.length === 1 ? 'item' : 'itens'})
        </Text>
        <Text fontSize="18px" fontWeight="bold">
          {currencyFormat(amount)}
        </Text>
        <Button bgColor="fifth.150" _hover={{ bgColor: 'fifth.250' }}>
          Fechar Pedido
        </Button>
      </VStack>
    </Box>
  );
}
