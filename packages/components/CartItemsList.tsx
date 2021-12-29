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

import ICartItem from '@packages/entities/ICartItem';

import CartItem from './CartItem';

interface Props {
  items: ICartItem[];
  onRemove: (item: ICartItem) => void;
}

export default function CartItemsList({ items = [], onRemove }: Props) {
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Produto</Th>
          <Th isNumeric>Preço</Th>
          <Th isNumeric>Quantidade</Th>
          <Th isNumeric>SubTotal</Th>
          <Th hidden>Controles</Th>
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
            >
              Continuar comprando
            </Button>
          </Td>
        </Tr>
      </Tfoot>
    </Table>
  );
}
