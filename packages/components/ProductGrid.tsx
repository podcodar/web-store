import { Box, Center, Text } from '@chakra-ui/react';

interface Props {
  products: any[];
}

export default function ProductGrid({ products }: Props) {
  return (
    <Box>
      <Center>Grade de produtos</Center>

      {products.map((p) => (
        <Text key={p.id}>{p.title}</Text>
      ))}
    </Box>
  );
}
