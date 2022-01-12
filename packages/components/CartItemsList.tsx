import { Box, Button, Text } from '@chakra-ui/react';
import { FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'next/router';

import ICartItem from '@packages/entities/ICartItem';

import CartItem from './CartItem';

interface Props {
  items: ICartItem[];
  onRemove: (item: ICartItem) => void;
}

export default function CartItemsList({ items = [], onRemove }: Props) {
  const router = useRouter();

  return (
    <Box w="full">
      {items.length ? (
        items.map((item) => (
          <CartItem key={item.product.id} item={item} onRemove={onRemove} />
        ))
      ) : (
        <Text m="5px" textAlign="center">
          Não há Itens no carrinho
        </Text>
      )}

      <Box
        d="flex"
        flexDirection="column"
        alignItems={{ base: 'center', lg: 'flex-start' }}
      >
        <Button
          margin="40px 0px"
          leftIcon={<FaArrowLeft />}
          bgColor="gray.300"
          _hover={{ bgColor: 'gray.400' }}
          onClick={() => router.push('/')}
        >
          Continuar Comprando
        </Button>
      </Box>
    </Box>
  );
}
