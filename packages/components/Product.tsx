import {
  Box,
  Image,
  Text,
  Button,
  HStack,
  StyleProps,
  ButtonProps,
} from '@chakra-ui/react';

import IProduct from '../entities/IProduct';
import { currencyFormat, calculateDiscount } from '../utils/functions';

interface Props {
  product: IProduct;
  onShow: () => void;
}

const boxStyle: StyleProps = {
  textAlign: 'center',
  padding: '5px',
};

const imageStyle: StyleProps = {
  margin: 'auto',
  width: '45%',
};

const titleStyle: StyleProps = {
  fontWeight: 'bold',
  marginTop: '5px',
  marginBottom: '5px',
  fontSize: 'lg',
};

const descriptionStyle: StyleProps = {
  fontSize: 'sm',
  marginTop: '5px',
  marginBottom: '5px',
};

const cardBody: StyleProps = {
  height: '16em',
};

const cardImage: StyleProps = {
  height: '10.5em',
};

const cardFooter: StyleProps = {
  width: '100%',
  height: '4em',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const buttonStyle: ButtonProps = {
  bgColor: 'fifth.150',
  _hover: { bgColor: 'fifth.250' },
  width: '60%',
};

export default function Product({ product, onShow }: Props) {
  return (
    <Box sx={boxStyle}>
      <Box sx={cardBody}>
        <Box sx={cardImage}>
          <Image src={product.img} alt={product.title} sx={imageStyle} />
        </Box>
        <Text sx={titleStyle} isTruncated>
          {product.title}
        </Text>
        <Text sx={descriptionStyle}>{product.description}</Text>
        {product.discount > 0 ? (
          <HStack justify="center">
            <Text textDecoration="line-through">
              {currencyFormat(product.price)}
            </Text>
            <Text>{currencyFormat(calculateDiscount(product))}</Text>
          </HStack>
        ) : (
          <Text>{currencyFormat(product.price)}</Text>
        )}
      </Box>

      <Box sx={cardFooter}>
        <Button sx={buttonStyle} onClick={onShow}>
          Comprar
        </Button>
      </Box>
    </Box>
  );
}
