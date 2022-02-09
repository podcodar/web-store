import {
  Image,
  Text,
  Stack,
  Box,
  chakra,
  HStack,
  Button,
} from '@chakra-ui/react';

import ICartItem from '@packages/entities/ICartItem';
import { currencyFormat } from '@packages/utils/functions';

import InputMask, { onlyNumbers } from './InputMask';

interface Props {
  item: ICartItem;
  onQuantityChange: (item: ICartItem, quantity: number) => void;
  onRemove: (item: ICartItem) => void;
}

const TCell = chakra(Box, {
  baseStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: { base: 'center', lg: 'flex-start' },
    alignItems: { base: 'center', lg: 'flex-start' },
    marginBottom: '1em',
  },
});

export default function CartItem({ item, onQuantityChange, onRemove }: Props) {
  return (
    <Stack direction={{ base: 'column', lg: 'row' }} spacing="1em">
      <TCell minW="10em">
        <Image
          src={item.product.img}
          alt={item.product.title}
          w={{ base: '12em', sm: '12em', md: '12em', lg: '14em' }}
          h={{ base: '14em', sm: '14em', md: '14em', lg: '12em' }}
        />
      </TCell>
      <TCell w="full">
        <Text fontWeight="bold">{item.product.title}</Text>
        <Text textAlign={{ base: 'center', lg: 'left' }} marginBottom="1em">
          {item.product.description}
        </Text>
        <HStack>
          <Text fontWeight="bold">Qtd:</Text>
          <InputMask
            type="text"
            textAlign="center"
            w="4em"
            maxLength={4}
            bgColor="gray.200"
            mask={onlyNumbers}
            value={item.quantity || ''}
            onChange={(e) => onQuantityChange(item, Number(e.target.value))}
          />
          <Button
            color="blue.500"
            bgColor="transparent"
            fontSize="11px"
            fontWeight="bold"
            onClick={() => onRemove(item)}
          >
            Excluir
          </Button>
        </HStack>
      </TCell>
      <TCell>
        <Text fontSize="18px" fontWeight="bold" marginBottom="1em">
          {currencyFormat(item.quantity * item.product.price)}
        </Text>
      </TCell>
    </Stack>
  );
}
