import { Box, Image, Text, Button, HStack } from '@chakra-ui/react';

import IProduct from '../entities/IProduct';
import { currencyFormat, calculateDiscount } from '../utils/functions';

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
      {product.discountPrice > 0 ? (
        <HStack>
          <Text textDecoration="line-through">
            {currencyFormat(product.price)}
          </Text>
          <Text>{currencyFormat(calculateDiscount(product))}</Text>
        </HStack>
      ) : (
        <Text>{currencyFormat(product.price)}</Text>
      )}
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
