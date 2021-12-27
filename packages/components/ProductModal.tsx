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
} from '@chakra-ui/react';

import IProduct from '@packages/entities/IProduct';
import useStorage from '@packages/hooks/useStorage';
import ICart from '@packages/entities/ICart';
import { currencyFormat } from '@packages/utils/functions';

interface Props {
  isOpen: boolean;
  product: IProduct;
  onClose: () => void;
}

export default function ProductModal({ isOpen, product, onClose }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useStorage<ICart>('cart');

  const addToCart = () => {
    const items = cart.items ? [...cart.items] : [];
    items.push({ product, quantity });

    setCart({ ...cart, items });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW="70%" maxH="80rem">
        <Divider height="3vh" />
        <ModalCloseButton />
        <ModalBody>
          <Box d="flex">
            <Box w="60rem" marginRight="15px" d="flex" justifyContent="center">
              <Image src={product.img} alt={product.title} h="50vh" />
            </Box>
            <Box>
              <Text fontSize={25} fontWeight="bold">
                {product.title}
              </Text>
              <Text>{product.fullDescription}</Text>
              <Text marginTop="2%" fontWeight="bold">
                {currencyFormat(product.price)}
              </Text>
              <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                w="55px"
                textAlign="center"
                marginRight="1%"
                bgColor="gray.200"
              />
              <Button
                bgColor="gray.200"
                marginRight="1%"
                _hover={{ bgColor: 'gray.300' }}
                onClick={addToCart}
              >
                Adicionar Carrinho
              </Button>
            </Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
