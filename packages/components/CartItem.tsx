import { Box, Image, Text, HStack, Button } from '@chakra-ui/react';

import ICartItem from '@packages/entities/ICartItem';
import { currencyFormat } from '@packages/utils/functions';

interface Props {
  item: ICartItem;
  onRemove: () => void;
}

export default function CartItem({ item, onRemove }: Props) {
  return (
    <Box d="flex" marginBottom="20px">
      <Box marginRight="15px">
        <Image src={item.product.img} alt={item.product.title} w="300px" />
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
            <Text>{currencyFormat(item.product.price)}</Text>
          </HStack>
          <HStack>
            <Text fontWeight="bold">Quantidade:</Text>
            <Text>{item.quantity}</Text>
          </HStack>
          <HStack>
            <Text fontWeight="bold">Sub Total:</Text>
            <Text>{currencyFormat(item.product.price * item.quantity)}</Text>
          </HStack>
          <Button
            bgColor="gray.200"
            _hover={{ bgColor: 'gray.300' }}
            onClick={onRemove}
          >
            Remover
          </Button>
        </HStack>
      </Box>
    </Box>
  );
}
