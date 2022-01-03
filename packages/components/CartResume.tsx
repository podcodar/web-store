import { Box, Button, Text } from '@chakra-ui/react';

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
    <Box marginLeft="20px" marginTop="8px">
      <Box marginBottom="10px">
        <Text
          fontSize="15px"
          fontWeight="bold"
          textTransform="uppercase"
          marginBottom="5px"
        >
          Total à Pagar
        </Text>
        <Text fontSize="15px">{currencyFormat(amount)}</Text>
      </Box>
      <Button bgColor="fifth.150" _hover={{ bgColor: 'fifth.250' }}>
        Finalizar Compra
      </Button>
    </Box>
  );
}
