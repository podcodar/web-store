import {
  Text as ChackraText,
  Box,
  Grid,
  GridItem,
  chakra,
} from '@chakra-ui/react';

import IOrder from '@packages/entities/IOrder';

const H1 = chakra(ChackraText, {
  baseStyle: {
    fontWeight: 'bold',
    fontSize: '14px',
    color: 'gray.600',
  },
});

const H2 = chakra(ChackraText, {
  baseStyle: {
    fontSize: '14px',
    color: 'gray.600',
    textAlign: 'left',
  },
});

const Text = chakra(ChackraText, {
  baseStyle: {
    fontSize: '14px',
    color: 'gray.600',
  },
});

interface Props {
  title?: string;
  order: IOrder;
}

export default function DeliveryInfo({
  title = 'Endereço da entrega',
  order,
}: Props) {
  return (
    <Box>
      <H1>{title}</H1>
      <Grid templateColumns="0.3fr 1fr" rowGap="0.1em" marginTop="5px">
        <GridItem>
          <H2>Nome:</H2>
        </GridItem>
        <GridItem>
          <Text textAlign="left">{order.buyer?.name}</Text>
        </GridItem>

        <GridItem>
          <H2>Endereço:</H2>
        </GridItem>
        <GridItem>
          <Text textAlign="left">
            {`${order.delivery?.address.address} ${order.delivery?.address.number}`}
          </Text>
        </GridItem>

        <GridItem>
          <H2>Bairro:</H2>
        </GridItem>
        <GridItem>
          <Text textAlign="left">{order.delivery?.address.district}</Text>
        </GridItem>

        <GridItem>
          <H2>Compl.:</H2>
        </GridItem>
        <GridItem>
          <Text textAlign="left">{order.delivery?.address.complement}</Text>
        </GridItem>

        <GridItem>
          <H2>Cidade:</H2>
        </GridItem>
        <GridItem>
          <Text textAlign="left">
            {`${order.delivery?.address.city} - ${order.delivery?.address.uf}`}
          </Text>
        </GridItem>

        <GridItem>
          <H2>Cep:</H2>
        </GridItem>
        <GridItem>
          <Text textAlign="left">{order.delivery?.address.cep}</Text>
        </GridItem>

        <GridItem>
          <H2>Telefone:</H2>
        </GridItem>
        <GridItem>
          <Text textAlign="left">{order.buyer?.phone}</Text>
        </GridItem>
      </Grid>
    </Box>
  );
}
