import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  FormLabelProps,
  Radio,
  RadioGroup,
  RadioProps,
  Stack,
  Text,
  TextProps,
} from '@chakra-ui/react';

const titleStyle: TextProps = {
  marginTop: '1em',
  fontSize: '25px',
  fontWeight: 'bold',
  color: 'black',
};

const fieldsetStyle: FormControlProps = {
  border: '1px solid #ccc',
  padding: '1em',
  borderRadius: '0.3em',
};

const fieldsetLabelStyle: FormLabelProps = {
  fontSize: '18px',
  fontWeight: 'bold',
  color: 'gray.600',
};

const radioStyle: RadioProps = {
  size: 'lg',
  _placeholder: { fontSize: '14px' },
};

const radioLabelStyle: TextProps = {
  fontSize: '14px',
  fontWeight: 'bold',
  color: 'gray.600',
};

export default function BuyerDelivery() {
  return (
    <Stack direction="column" spacing="1em" marginBottom="5em">
      <Text {...titleStyle}>Envio</Text>

      <form>
        <Stack direction="column" spacing="2em">
          <FormControl {...fieldsetStyle}>
            <FormLabel {...fieldsetLabelStyle}>Forma de envio</FormLabel>
            <RadioGroup name="delivery-form" defaultValue="Correios">
              <Stack direction="column" spacing="1em">
                <Stack direction="row">
                  <Radio {...radioStyle} value="Correios" />
                  <Stack direction="column" spacing="1px">
                    <Text {...radioLabelStyle}>Correios</Text>
                    <FormHelperText>
                      Custo do envio será calculado e informado pelo vendedor.
                    </FormHelperText>
                  </Stack>
                </Stack>
                <Stack direction="row">
                  <Radio {...radioStyle} value="Comunidade" />
                  <Stack direction="column" spacing="1px">
                    <Text {...radioLabelStyle}>Comunidade</Text>
                    <FormHelperText>
                      Entrega a combinar com alguém da comunidade.
                    </FormHelperText>
                  </Stack>
                </Stack>
              </Stack>
            </RadioGroup>
            <FormErrorMessage>Forma de envio é requerida.</FormErrorMessage>
          </FormControl>
        </Stack>
      </form>
    </Stack>
  );
}
