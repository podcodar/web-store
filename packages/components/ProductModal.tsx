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
  Divider,
  Stack,
  ModalFooter,
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
      <ModalContent maxW="70%">
        <Divider height="3vh" />
        <ModalCloseButton />
        <ModalBody>
          <Stack direction={{ base: 'column', lg: 'row' }} spacing="1em">
            <Box display="flex" justifyContent="center">
              <Image
                src={product.img}
                alt={product.title}
                m="1em"
                w={{ base: '12em', lg: '52em' }}
              />
            </Box>
            <Box>
              <Text fontSize={25} fontWeight="bold">
                {product.title}
              </Text>
              <Text textAlign="justify">{product.fullDescription}</Text>
              <Text marginTop="2%" fontWeight="bold">
                {currencyFormat(product.price)}
              </Text>
              <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                w="55px"
                textAlign="center"
                marginRight="1%"
                bgColor="gray.200"
              />
              <Button
                bgColor="gray.300"
                marginRight="1%"
                _hover={{ bgColor: 'gray.400' }}
                onClick={addToCart}
              >
                Adicionar Carrinho
              </Button>
            </Box>
          </Stack>
        </ModalBody>
        <ModalFooter> </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
