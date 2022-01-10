import { Box, Button, Center, Text, VStack } from '@chakra-ui/react';

import ICartItem from '@packages/entities/ICartItem';
import { currencyFormat } from '@packages/utils/functions';

interface Props {
  items: ICartItem[];
}

export default function CartResume({ items = [] }: Props) {
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
