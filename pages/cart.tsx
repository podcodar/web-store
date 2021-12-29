import { Box, Text } from '@chakra-ui/react';

import CartItemsList from '@packages/components/CartItemsList';
import CartResume from '@packages/components/CartResume';
import Footer from '@packages/components/Footer';
import ICart from '@packages/entities/ICart';
import ICartItem from '@packages/entities/ICartItem';
import useStorage from '@packages/hooks/useStorage';

export default function Cart() {
  const [cart, setCart] = useStorage<ICart>('cart');

  const removeFromCart = (carItem: ICartItem) => {
    const items: ICartItem[] = [];
    let amount = 0;

    cart.items.forEach((item) => {
      if (item.product.id !== carItem.product.id) {
        items.push({ ...item });
        amount += item.product.price * item.quantity;
      }
    });

    setCart({ ...cart, items, amount });
  };

  return (
    <>
      <Box m="auto" marginTop="1%" marginBottom="2%" w="80%">
        <Text fontWeight="bold" fontSize="25px">
          Carrinho de compras
        </Text>
        <Box minH="100vh" d="flex">
          <Box w="80%">
            <CartItemsList items={cart.items} onRemove={removeFromCart} />
          </Box>
          <Box>
            <CartResume />
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
}
