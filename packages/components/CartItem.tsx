import { Image, Text, HStack, Tr, Td, IconButton } from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';

import ICartItem from '@packages/entities/ICartItem';
import { currencyFormat } from '@packages/utils/functions';

interface Props {
  item: ICartItem;
  onRemove: (item: ICartItem) => void;
}

export default function CartItem({ item, onRemove }: Props) {
  return (
    <Tr key={item.product.id}>
      <Td d="flex" alignItems="center">
        <HStack spacing="20px">
          <Image src={item.product.img} alt={item.product.title} w="100px" />
          <Text>{item.product.description}</Text>
        </HStack>
      </Td>
      <Td>{currencyFormat(item.product.price)}</Td>
      <Td>{item.quantity}</Td>
      <Td>{currencyFormat(item.product.price * item.quantity)}</Td>
      <Td>
        <IconButton
          aria-label="delete button"
          color="red.400"
          icon={<FaTrash />}
          bgColor="gray.200"
          _hover={{ bgColor: 'red.200' }}
          onClick={() => onRemove(item)}
        />
      </Td>
    </Tr>
  );
}
