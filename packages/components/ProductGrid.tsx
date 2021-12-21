import { Box, SimpleGrid } from '@chakra-ui/react';
import { useState } from 'react';

import IProduct from '../entities/IProduct';

import Product from './Product';
import ProductModal from './ProductModal';

interface Props {
  products: IProduct[];
}

export default function ProductGrid({ products }: Props) {
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState({} as IProduct);

  const showHideDetails = (open: boolean, product: IProduct) => {
    setOpen(open);
    setProduct(product);
  };

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
          <Product
            key={p.id}
            product={p}
            onShow={() => showHideDetails(true, p)}
          />
        ))}
      </SimpleGrid>
      <ProductModal
        isOpen={open}
        onClose={() => showHideDetails(false, {} as IProduct)}
        product={product}
      />
    </Box>
  );
}
