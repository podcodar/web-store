import {
  Button,
  Table,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
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
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Produto</Th>
          <Th isNumeric>Preço</Th>
          <Th isNumeric>Quantidade</Th>
          <Th colSpan={2}>SubTotal</Th>
        </Tr>
      </Thead>
      <Tbody>
        {items.length ? (
          items.map((item) => (
            <CartItem key={item.product.id} item={item} onRemove={onRemove} />
          ))
        ) : (
          <Tr>
            <Td colSpan={5}>
              <Text textAlign="center">Não há Itens no carrinho</Text>
            </Td>
          </Tr>
        )}
      </Tbody>
      <Tfoot>
        <Tr>
          <Td colSpan={5}>
            <Button
              leftIcon={<FaArrowLeft />}
              bgColor="gray.200"
              _hover={{ bgColor: 'gray.300' }}
              onClick={() => router.push('/')}
            >
              Continuar Comprando
            </Button>
          </Td>
        </Tr>
      </Tfoot>
    </Table>
  );
}
