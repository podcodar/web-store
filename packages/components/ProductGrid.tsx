import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  SimpleGrid,
  Text,
  Image,
  Icon,
  Input,
  Button,
  Divider,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaUser } from 'react-icons/fa';

import IProduct from '../entities/IProduct';

import Product from './Product';

interface Props {
  products: any[];
}

export default function ProductGrid({ products }: Props) {
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState({} as IProduct);

  const showHideDetails = (open: boolean, product: IProduct) => {
    setOpen(open);
    setProduct(product);
  };

  return (
    <Box>
      <SimpleGrid
        m="auto"
        marginTop="2%"
        marginBottom="2%"
        w="80%"
        columns={4}
        spacing={5}
      >
        {products.map((p) => (
          <Product
            key={p.id}
            product={p}
            onShow={() => showHideDetails(true, p)}
          />
        ))}
      </SimpleGrid>

      <Modal
        isOpen={open}
        onClose={() => showHideDetails(false, {} as IProduct)}
        size="full"
      >
        <ModalOverlay />
        <ModalContent>
          <Divider height="3vh" />
          <ModalCloseButton />
          <ModalBody>
            <Box d="flex">
              <Box w="80%" marginRight="1%" d="flex" justifyContent="center">
                <Image src={product.img} alt={product.title} w="300px" />
              </Box>
              <Box>
                <Text fontSize={25} fontWeight="bold">
                  {product.title}
                </Text>
                <Text>{product.longDescription}</Text>
                <Text marginTop="2%" fontWeight="bold">
                  {product.price
                    ? product.price.toLocaleString('pt-br', {
                        style: 'currency',
                        currency: 'BRL',
                      })
                    : ''}
                </Text>
                <Input
                  value={1}
                  readOnly
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
    </Box>
  );
}
