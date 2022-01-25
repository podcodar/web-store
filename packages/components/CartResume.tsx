import { useRouter } from 'next/router';
import { Box, Button, Text, VStack } from '@chakra-ui/react';

import ICartItem from '@packages/entities/ICartItem';
import { currencyFormat } from '@packages/utils/functions';

interface Props {
  items: ICartItem[];
}

export default function CartResume({ items = [] }: Props) {
  const router = useRouter();
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
        <Button
          bgColor="fifth.150"
          _hover={{ bgColor: 'fifth.250' }}
          onClick={() => router.push('/checkout')}
        >
          Fechar Pedido
        </Button>
      </VStack>
    </Box>
  );
}
