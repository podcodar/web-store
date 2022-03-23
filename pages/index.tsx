import { StyleProps, Text } from '@chakra-ui/react';

import Footer from '@packages/components/Footer';
import LaunchCountDown from '@packages/components/LaunchCountDown';
import ProductGrid from '@packages/components/ProductGrid';
import IProduct from '@packages/entities/IProduct';

import { products } from '../db';

interface Props {
  products: IProduct[];
}

const title: StyleProps = {
  color: 'red',
  fontSize: '30px',
  fontWeight: 'bold',
  textAlign: 'center',
  marginTop: '20px',
};

const subtitle: StyleProps = {
  color: 'red',
  fontSize: '18px',
  fontWeight: 'bold',
  textAlign: 'center',
};

export default function Home({ products }: Props) {
  return (
    <>
      <Text sx={title}>Atenção</Text>
      <Text sx={subtitle}>Todos os Produtos abaixo são para testes!</Text>
      <Text sx={subtitle}>Estamos em processo de desenvolvimento!</Text>
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
