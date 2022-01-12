import { Box, Stack, Text } from '@chakra-ui/react';

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

  return (
    <>
      <Box w="80%" margin="auto" marginTop="1em" marginBottom="3em">
        <Text
          fontWeight="bold"
          fontSize="25px"
          textAlign={{ base: 'center', lg: 'left' }}
          marginBottom="1em"
          borderBottom="1px"
          borderBottomColor="gray.200"
        >
          Carrinho de Compras
        </Text>

        <Stack direction={{ base: 'column', lg: 'row' }} spacing="1em">
          <CartItemsList
            items={cart.items}
            onQuantityChange={quantityChange}
            onRemove={removeFromCart}
          />
          <CartResume items={cart.items} />
        </Stack>
      </Box>
      <Footer />
    </>
  );
}
