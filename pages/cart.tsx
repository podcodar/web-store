import { Box, Text } from '@chakra-ui/react';

import CartItemsList from '@packages/components/CartItemsList';
import CartResume from '@packages/components/CartResume';
import Footer from '@packages/components/Footer';
import ICartItem from '@packages/entities/ICartItem';
import { useCartActions, useCartStates } from '@packages/features/cart-context';

export default function Cart() {
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

  return (
    <>
      <Box m="auto" marginTop="1%" marginBottom="2%" w="80%">
        <Text fontWeight="bold" fontSize="25px">
          Carrinho de compras
        </Text>
        <Box minH="100vh" d="flex">
          <Box w="78%">
            <CartItemsList items={cart.items} onRemove={removeFromCart} />
          </Box>
          <Box>
            <CartResume items={cart.items} />
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
}
