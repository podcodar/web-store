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
  ModalHeader,
  ModalOverlay,
  VStack,
  Text,
} from '@chakra-ui/react';

import IProduct from '@packages/entities/Product';

interface ModalProps {
  isOpen: boolean;
  product: IProduct;

  onClose: () => void;
}

export default function ProductModal({ isOpen, product, onClose }: ModalProps) {
  const [quantity, setQuantity] = useState(1);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW="50rem" maxH="40rem">
        <ModalHeader>Detalhes do produto</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box display="flex">
            <Box w="50%" minW="50%" marginRight="10px">
              <Image src={product.img} alt={product.title} w="300px" />
            </Box>
            <Box>
              <VStack display="flex" alignItems="flex-start" distance="30px">
                <Text fontWeight="bold">{product.title}</Text>
                <Text>{product.fullDescription}</Text>
                <Text>
                  {product.price
                    ? product.price.toLocaleString('pt-br', {
                        style: 'currency',
                        currency: 'BRL',
                      })
                    : ''}
                </Text>
                <Box>
                  <Input
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    bgColor="gray.500"
                    w="20%"
                    marginRight="10px"
                    textAlign="center"
                  />
                  <Button bgColor="gray.300" _hover={{ bgColor: 'gray.500' }}>
                    Adicionar Carrinho
                  </Button>
                </Box>
              </VStack>
            </Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
