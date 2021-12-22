import { Box, Image, Text, Button, Link } from '@chakra-ui/react';

import IProduct from '../entities/IProduct';

interface Props {
  product: IProduct;
  onShow: () => void;
}

export default function Product({ product, onShow }: Props) {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Image src={product.img} alt={product.title} w="80%" h="80%" />
      <Link href={`/product/${product.id}`}>
        <Text fontWeight="bold">{product.title}</Text>
      </Link>
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
