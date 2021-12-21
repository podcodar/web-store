import Footer from '@packages/components/Footer';
import ProductGrid from '@packages/components/ProductGrid';
import IProduct from '@packages/entities/Product';

import { products } from '../db';

interface Props {
  products: IProduct[];
}

export default function Home({ products }: Props) {
  return (
    <>
      <ProductGrid products={products} />
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      products: products,
    },
  };
}
