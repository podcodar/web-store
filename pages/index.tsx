import { useState } from 'react';

import Footer from '@packages/components/Footer';
import LaunchCountDown from '@packages/components/LaunchCountDown';
import ProductGrid from '@packages/components/ProductGrid';
import Carousel from '@packages/components/Carousel';
import IProduct from '@packages/entities/IProduct';

import { products } from '../db';

interface Props {
  products: IProduct[];
}

export default function Home({ products }: Props) {
  const [lauched, setLaunched] = useState(false);
  return (
    <>
      {lauched ? <Carousel /> : <LaunchCountDown setLaunched={setLaunched} />}
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
