import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
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
  Icon,
  Divider,
} from '@chakra-ui/react';

import IProduct from '@packages/entities/IProduct';

interface Props {
  isOpen: boolean;
  product: IProduct;
  onClose: () => void;
}

export default function ProductModal({ isOpen, product, onClose }: Props) {
  const [quantity, setQuantity] = useState(1);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW="80%" maxH="60rem">
        <Divider height="3vh" />
        <ModalCloseButton />
        <ModalBody>
          <Box d="flex">
            <Box w="80%" marginRight="1%" d="flex" justifyContent="center">
              <Image src={product.img} alt={product.title} h="300px" />
            </Box>
            <Box>
              <Text fontSize={25} fontWeight="bold">
                {product.title}
              </Text>
              <Text>{product.fullDescription}</Text>
              <Text marginTop="2%" fontWeight="bold">
                {product.price
                  ? product.price.toLocaleString('pt-br', {
                      style: 'currency',
                      currency: 'BRL',
                    })
                  : ''}
              </Text>
              <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                w="7%"
                textAlign="center"
                marginRight="1%"
                bgColor="gray.200"
              />
              <Button
                bgColor="gray.200"
                marginRight="1%"
                _hover={{ bgColor: 'gray.300' }}
              >
                Adicionar Carrinho
              </Button>
              <Button bgColor="fifth.100" _hover={{ bgColor: 'fifth.200' }}>
                Comprar
              </Button>
            </Box>
          </Box>
          <Box>
            <Text
              fontWeight="bold"
              fontSize={18}
              marginTop="1%"
              borderBottom="2px solid #ccc"
            >
              Comentários
            </Text>
            <Box d="flex">
              <Icon as={FaUser} w="32px" h="32px" m="1%" />
              <Text mt="1%">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using Content
                here, content here, making it look like readable English.
              </Text>
            </Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
