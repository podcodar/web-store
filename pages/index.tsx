import { StyleProps, Text } from '@chakra-ui/react';

import Footer from '@packages/components/Footer';
import LaunchCountDown from '@packages/components/LaunchCountDown';
import ProductGrid from '@packages/components/ProductGrid';
import IProduct from '@packages/entities/IProduct';

import { products } from '../db';

interface Props {
  products: IProduct[];
}

const textStyle1: StyleProps = {
  color: 'red',
  fontSize: '18px',
  fontWeight: 'bold',
  textAlign: 'center',
};

const textStyle2: StyleProps = {
  color: 'red',
  fontSize: '30px',
  fontWeight: 'bold',
  textAlign: 'center',
  marginTop: '20px',
};

export default function Home({ products }: Props) {
  return (
    <>
      <Text sx={textStyle2}>Atenção</Text>
      <Text sx={textStyle1}>Todos os Produtos abaixo são para testes!</Text>
      <Text sx={textStyle1}>Estamos em processo de desenvolvimento!</Text>
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
