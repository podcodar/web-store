import { Box, Button, HStack, Image, Text } from '@chakra-ui/react';

import Footer from '@packages/components/Footer';
import ICart from '@packages/entities/ICart';
import useStorage from '@packages/hooks/useStorage';

export default function Cart() {
  const [cart, setCart] = useStorage<ICart>('cart');

  return (
    <>
      <Box m="auto" marginTop="2%" marginBottom="2%" w="80%">
        {cart.items ? (
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
                        <Text>
                          {item.product.price.toLocaleString('pt-br', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </Text>
                      </HStack>
                      <HStack>
                        <Text fontWeight="bold">Quantidade:</Text>
                        <Text>{item.quantity}</Text>
                      </HStack>
                    </HStack>
                  </Box>
                </Box>
              ))}
            </Box>

            <Box d="flex" justifyContent="flex-end">
              <Button
                bgColor="fifth.150"
                _hover={{ bgColor: 'fifth.250' }}
                onClick={() => setCart({} as ICart)}
              >
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
