import { Box, StyleProps, Text } from '@chakra-ui/react';

const boxStyle: StyleProps = {
  backgroundColor: 'gray.100',
  padding: '2em 0em',
  textAlign: 'center',
};

export default function LaunchCountDown() {
  return (
    <Box sx={boxStyle}>
      <Text>Faltam</Text>
      <Text>30 dias 9 horas 55 minutos 35 segundos</Text>
      <Text>para o lançamento!</Text>
    </Box>
  );
}
