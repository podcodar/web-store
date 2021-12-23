import { Box, Button, Text } from '@chakra-ui/react';

import CartItem from '@packages/components/CartItem';
import Footer from '@packages/components/Footer';
import ICart from '@packages/entities/ICart';
import useStorage from '@packages/hooks/useStorage';

export default function Cart() {
  const [cart, setCart] = useStorage<ICart>('cart');

  const removeFromCart = (productId: number) => {
    const items = cart.items.filter((item) => productId !== item.product.id);

    setCart({ ...cart, items });
  };

  return (
    <>
      <Box m="auto" marginTop="2%" marginBottom="2%" w="80%">
        {cart.items && cart.items.length ? (
          <Box minH="70vh">
            <Box>
              {cart.items.map((item) => (
                <CartItem
                  key={item.product.id}
                  item={item}
                  onRemove={() => removeFromCart(item.product.id)}
                />
              ))}
            </Box>

            <Box d="flex" justifyContent="flex-end">
              <HStack>
                <Text fontWeight="bold">Total:</Text>
                <Text>{currencyFormat(cart.amount)}</Text>
              </HStack>
              <Button bgColor="fifth.150" _hover={{ bgColor: 'fifth.250' }}>
                Finalizar Compra
              </Button>
            </Box>
          </Box>
        ) : (
          <Box h="70vh">
            <Text fontWeight="bold" fontSize="25px" textAlign="center">
              Não há itens no carrinho.
            </Text>
          </Box>
        )}
      </Box>

      <Footer />
    </>
  );
}
