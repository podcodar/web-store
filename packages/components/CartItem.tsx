import { Image, Text, IconButton, Stack, Box, chakra } from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';

import ICartItem from '@packages/entities/ICartItem';
import { currencyFormat } from '@packages/utils/functions';

interface Props {
  item: ICartItem;
  onRemove: (item: ICartItem) => void;
}

const Title = chakra(Text, {
  baseStyle: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: '14px',
    fontWeight: 'bold',
    color: 'gray.700',
    margin: '8px 0px',
    display: { base: 'block', lg: 'none' },
  },
});

const TCell = chakra(Box, {
  baseStyle: {
    minW: '7em',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '5px 0px',
  },
});

export default function CartItem({ item, onRemove }: Props) {
  return (
    <Stack m="8px 0px" direction={{ base: 'column', lg: 'row' }}>
      <TCell>
        <Title>Produto</Title>
        <Image
          src={item.product.img}
          alt={item.product.title}
          w={{ base: '60%', lg: '6em' }}
        />
      </TCell>
      <TCell w="full">
        <Title>Descrição</Title>
        <Text textAlign="center">{item.product.description}</Text>
      </TCell>
      <TCell>
        <Title>Preço</Title>
        {currencyFormat(item.product.price)}
      </TCell>
      <TCell>
        <Title>Quantidade</Title>
        {item.quantity}
      </TCell>
      <TCell>
        <Title>Subtotal</Title>
        {currencyFormat(item.product.price * item.quantity)}
      </TCell>
      <TCell>
        <IconButton
          aria-label="delete button"
          color="red.400"
          icon={<FaTrash />}
          bgColor="gray.300"
          _hover={{ bgColor: 'red.200' }}
          onClick={() => onRemove(item)}
        />
      </TCell>
    </Stack>
  );
}
