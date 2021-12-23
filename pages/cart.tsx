import { Box, Button, HStack, Text } from '@chakra-ui/react';

import CartItem from '@packages/components/CartItem';
import Footer from '@packages/components/Footer';
import ICart from '@packages/entities/ICart';
import ICartItem from '@packages/entities/ICartItem';
import useStorage from '@packages/hooks/useStorage';
import { currencyFormat } from '@packages/utils/functions';

export default function Cart() {
  const [cart, setCart] = useStorage<ICart>('cart');

  const removeFromCart = (productId: number) => {
    const items: ICartItem[] = [];
    let amount = 0;

    cart.items.forEach((item) => {
      if (item.product.id !== productId) {
        items.push({ ...item });
        amount += item.product.price * item.quantity;
      }
    });

    setCart({ ...cart, items, amount });
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
              <HStack spacing="30px">
                <HStack>
                  <Text fontWeight="bold">Total à Pagar:</Text>
                  <Text>{currencyFormat(cart.amount)}</Text>
                </HStack>
                <Button bgColor="fifth.150" _hover={{ bgColor: 'fifth.250' }}>
                  Finalizar Compra
                </Button>
              </HStack>
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
