import { Box, Button, HStack, Image, Text } from '@chakra-ui/react';

import Footer from '@packages/components/Footer';
import ICart from '@packages/entities/ICart';
import useStorage from '@packages/hooks/useStorage';
import { currencyFormat } from '@packages/utils/functions';

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
                <Box key={item.product.id} d="flex" marginBottom="20px">
                  <Box marginRight="15px">
                    <Image
                      src={item.product.img}
                      alt={item.product.title}
                      w="300px"
                    />
                  </Box>
                  <Box>
                    <Text fontWeight="bold" fontSize="20px">
                      {item.product.title}
                    </Text>
                    <Text textAlign="justify" marginBottom="5px">
                      {item.product.fullDescription}
                    </Text>
                    <HStack spacing="30px">
                      <HStack>
                        <Text fontWeight="bold">Preço:</Text>
                        <Text>{currencyFormat(item.product.price)}</Text>
                      </HStack>
                      <HStack>
                        <Text fontWeight="bold">Quantidade:</Text>
                        <Text>{item.quantity}</Text>
                      </HStack>
                      <HStack>
                        <Text fontWeight="bold">Sub Total:</Text>
                        <Text>
                          {currencyFormat(item.product.price * item.quantity)}
                        </Text>
                      </HStack>
                      <Button
                        bgColor="gray.200"
                        _hover={{ bgColor: 'gray.300' }}
                        onClick={() => removeFromCart(item.product.id)}
                      >
                        Remover
                      </Button>
                    </HStack>
                  </Box>
                </Box>
              ))}
            </Box>

            <Box d="flex" justifyContent="flex-end">
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
