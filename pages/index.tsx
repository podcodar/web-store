import Footer from '@packages/components/Footer';
import ProductGrid from '@packages/components/ProductGrid';

interface Props {
  products: any[];
}

export default function Home({ products }: Props) {
  return (
    <>
      <ProductGrid products={products} />
      <Footer />
    </>
  );
}

const data = [
  {
    id: 1,
    title: 'Product 1',
    price: 500,
    description: 'Description 1',
  },
  {
    id: 2,
    title: 'Product 2',
    price: 1050,
    description: 'Description 2',
  },
  {
    id: 3,
    title: 'Product 3',
    price: 3000,
    description: 'Description 3',
  },
  {
    id: 4,
    title: 'Product 4',
    price: 4000,
    description: 'Description 4',
  },
  {
    id: 5,
    title: 'Product 5',
    price: 5000,
    description: 'Description 5',
  },
];

export async function getStaticProps() {
  return {
    props: {
      products: data,
    },
  };
}
