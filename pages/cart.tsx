import { Box, Text } from '@chakra-ui/react';

import ICart from '@packages/entities/ICart';
import useStorage from '@packages/hooks/useStorage';

export default function Cart() {
  const [cart] = useStorage<ICart>('cart');

  return (
    <Box>
      <Text fontWeight="bold">Produtos do Carrinho de compras</Text>
      {cart.items &&
        cart.items.map((item) => (
          <Text key={item.product.id}>{item.product.title}</Text>
        ))}
    </Box>
  );
}
