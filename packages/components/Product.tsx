import { Box, Image, Text, Button } from '@chakra-ui/react';

import IProduct from '../entities/IProduct';

interface Props {
  product: IProduct;
  onShow: () => void;
}

export default function Product({ product, onShow }: Props) {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Image src={product.img} alt={product.title} w="12em" h="15em" />
      <Text fontWeight="bold">{product.title}</Text>
      <Text textAlign="center">{product.description}</Text>
      <Text>
        {product.price.toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        })}
      </Text>
      <Button
        bgColor="fifth.150"
        _hover={{ bgColor: 'fifth.250' }}
        onClick={onShow}
      >
        Comprar
      </Button>
    </Box>
  );
}
