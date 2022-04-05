import { Box, SimpleGrid, StyleProps } from '@chakra-ui/react';
import { useState } from 'react';

import IProduct from '../entities/IProduct';

import Product from './Product';
import ProductModal from './ProductModal';

interface Props {
  products: IProduct[];
}

const boxStyle: StyleProps = {
  minHeight: '90vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export default function ProductGrid({ products }: Props) {
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState({} as IProduct);

  const showHideDetails = (open: boolean, product: IProduct) => {
    setOpen(open);
    setProduct(product);
  };

  return (
    <Box sx={boxStyle}>
      <SimpleGrid
        m="auto"
        marginTop="1em"
        marginBottom="1em"
        w="80%"
        columns={{ base: 1, sm: 2, md: 3 }}
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
