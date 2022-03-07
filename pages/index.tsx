import Footer from '@packages/components/Footer';
import LaunchCountDown from '@packages/components/LaunchCountDown';
import ProductGrid from '@packages/components/ProductGrid';
import IProduct from '@packages/entities/IProduct';

import { products } from '../db';

interface Props {
  products: IProduct[];
}

export default function Home({ products }: Props) {
  return (
    <>
      <LaunchCountDown />
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
