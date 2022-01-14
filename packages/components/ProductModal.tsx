import { useState } from 'react';
import {
  Box,
  Button,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  Stack,
  ModalFooter,
  HStack,
  ModalHeader,
} from '@chakra-ui/react';

import IProduct from '@packages/entities/IProduct';
import { currencyFormat } from '@packages/utils/functions';
import { useCartActions, useCartStates } from '@packages/features/cart-context';

interface Props {
  isOpen: boolean;
  product: IProduct;
  onClose: () => void;
}

export default function ProductModal({ isOpen, product, onClose }: Props) {
  const [quantity, setQuantity] = useState('1');
  const { cart } = useCartStates();
  const { setCart } = useCartActions();

  const addToCart = () => {
    const items = cart.items ? [...cart.items] : [];
    const itemQuantity = Number(quantity);
    const existingItem = items.find((item) => item.product.id == product.id);

    if (!existingItem) {
      items.push({ product, quantity: itemQuantity });
    } else {
      existingItem.quantity += itemQuantity;
    }

    setCart({ ...cart, items });
    setQuantity('1');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW={{ base: '20em', sm: '26em', md: '35em', lg: '55em' }}>
        <ModalHeader> </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack direction={{ base: 'column', lg: 'row' }} spacing="1em">
            <Box display="flex" justifyContent="center">
              <Image
                src={product.img}
                alt={product.title}
                m="0em 1em"
                w={{ base: '12em', lg: '52em' }}
              />
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              alignItems={{ base: 'center', lg: 'flex-start' }}
            >
              <Text fontSize={25} fontWeight="bold">
                {product.title}
              </Text>
              <Text textAlign="justify">{product.fullDescription}</Text>

              <Text margin="0.5em 0em" fontWeight="bold">
                {currencyFormat(product.price)}
              </Text>

              <Stack spacing="1em" direction={{ base: 'column', lg: 'row' }}>
                <HStack justifyContent={{ base: 'center', lg: 'flex-start' }}>
                  <Text fontWeight="bold">Qtd:</Text>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    w="55px"
                    textAlign="center"
                    marginRight="1%"
                    bgColor="gray.200"
                  />
                </HStack>
                <Button
                  bgColor="gray.300"
                  marginRight="1%"
                  _hover={{ bgColor: 'gray.400' }}
                  onClick={addToCart}
                >
                  Adicionar Carrinho
                </Button>
              </Stack>
            </Box>
          </Stack>
        </ModalBody>
        <ModalFooter> </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
