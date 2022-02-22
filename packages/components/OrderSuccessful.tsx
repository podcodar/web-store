import {
  Stack,
  Text as ChakraText,
  chakra,
  Box,
  Button,
  Link,
} from '@chakra-ui/react';
import { FaArrowLeft } from 'react-icons/fa';

import Styles from './Styles';

const Title = chakra(ChakraText, {
  baseStyle: {
    marginTop: '1em',
    fontSize: '25px',
    fontWeight: 'bold',
    color: 'black',
  },
});

const Text = chakra(ChakraText, {
  baseStyle: {
    color: 'black',
  },
});

export default function OrderSuccessful() {
  return (
    <Stack direction="column" spacing="1em" marginBottom="5em">
      <Title>Sucesso</Title>

      <Stack direction="column" spacing="4em">
        <Box>
          <Text sx={Styles.textInfo} fontWeight="bold">
            Seu pedido foi enviado com sucesso!
          </Text>
          <Text sx={Styles.textInfo}>
            Entraremos em contato para informar o valor do frete e a forma de
            pagamento.
          </Text>
        </Box>

        <Box>
          <Link href="/" _hover={{ textDecoration: 'none' }}>
            <Button sx={Styles.button} leftIcon={<FaArrowLeft />}>
              Voltar para página inicial
            </Button>
          </Link>
        </Box>
      </Stack>
    </Stack>
  );
}
