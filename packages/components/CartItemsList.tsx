import { Box, Button, Text } from '@chakra-ui/react';
import { FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'next/router';

import ICartItem from '@packages/entities/ICartItem';

import CartItem from './CartItem';
import Styles from './Styles';

interface Props {
  items: ICartItem[];
  onQuantityChange: (item: ICartItem, quantity: number) => void;
  onRemove: (item: ICartItem) => void;
}

export default function CartItemsList({
  items = [],
  onQuantityChange,
  onRemove,
}: Props) {
  const router = useRouter();

  return (
    <Box w={{ base: 'full', lg: '77%' }}>
      {items.length ? (
        items.map((item) => (
          <CartItem
            key={item.product.id}
            item={item}
            onQuantityChange={onQuantityChange}
            onRemove={onRemove}
          />
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
          sx={Styles.button}
          margin="40px 0px"
          leftIcon={<FaArrowLeft />}
          onClick={() => router.push('/')}
        >
          Continuar Comprando
        </Button>
      </Box>
    </Box>
  );
}
