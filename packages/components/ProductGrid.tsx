import { Box, SimpleGrid } from '@chakra-ui/react';

import Product from './Product';

interface Props {
  products: any[];
}

export default function ProductGrid({ products }: Props) {
  return (
    <Box>
      <SimpleGrid
        m="auto"
        marginTop="2%"
        marginBottom="2%"
        w="80%"
        columns={4}
        spacing={5}
      >
        {products.map((p) => (
          <Product key={p.id} product={p} />
        ))}
      </SimpleGrid>
    </Box>
  );
}
