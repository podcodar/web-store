import {
  Box,
  Button,
  Collapse,
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  FormLabelProps,
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
  TextProps,
} from '@chakra-ui/react';
import { useFormik } from 'formik';

import UFS from '@packages/config/ufs';
import { EDeliveryWays } from '@packages/enums/EDeliveryWays';

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

const fieldsetLabelStyle = {
  fontSize: '18px',
  fontWeight: 'bold',
  color: 'gray.600',
};

const radioLabelStyle: TextProps = {
  fontSize: '14px',
  fontWeight: 'bold',
  color: 'gray.600',
};

const labelStyle: FormLabelProps = {
  fontSize: '14px',
  color: 'gray.600',
};

const inputStyle = {
  borderColor: 'gray.400',
  borderRadius: '4px',
  bgColor: 'gray.300',
};

function isReqHasMinSize(
  obj: any,
  key: string,
  fieldName: string,
  errors: any,
  size: number,
) {
  if (!obj[key]) {
    errors[key] = `${fieldName} é requerido(a).`;
  } else if (obj[key].length < size) {
    errors[key] = `${fieldName} deve conter no mínimo ${size} caracteres.`;
  }
}

export default function BuyerDelivery() {
  const formik = useFormik({
    initialValues: {
      deliveryWay: EDeliveryWays.MAIL,
      address: '',
    },
    validate: (values) => {
      const errors = {};

      isReqHasMinSize(values, 'address', 'Logradouro', errors, 10);

      return errors;
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Stack direction="column" spacing="1em" marginBottom="5em">
      <Text {...titleStyle}>Envio</Text>

      <form onSubmit={formik.handleSubmit}>
        <Stack direction="column" spacing="2em">
          <FormControl {...fieldsetStyle}>
            <FormLabel {...fieldsetLabelStyle}>Forma de envio</FormLabel>
            <RadioGroup
              id="deliveryWay"
              name="deliveryWay"
              value={formik.values.deliveryWay}
              onChange={(value) => formik.setFieldValue('deliveryWay', value)}
            >
              <Stack direction="column" spacing="1em">
                <Stack direction="row">
                  <Radio size="lg" value={EDeliveryWays.MAIL} />
                  <Stack direction="column" spacing="1px">
                    <Text {...radioLabelStyle}>{EDeliveryWays.MAIL}</Text>
                    <FormHelperText>
                      Custo do envio será calculado e informado pelo vendedor.
                    </FormHelperText>
                  </Stack>
                </Stack>
                <Stack direction="row">
                  <Radio size="lg" value={EDeliveryWays.COMMUNITY} />
                  <Stack direction="column" spacing="1px">
                    <Text {...radioLabelStyle}>{EDeliveryWays.COMMUNITY}</Text>
                    <FormHelperText>
                      Entrega a combinar com alguém da comunidade.
                    </FormHelperText>
                  </Stack>
                </Stack>
              </Stack>
            </RadioGroup>
            <FormErrorMessage>Forma de envio é requerida.</FormErrorMessage>
          </FormControl>

          <Collapse in={formik.values.deliveryWay === EDeliveryWays.MAIL}>
            <Box {...fieldsetStyle}>
              <Text {...fieldsetLabelStyle} marginBottom="0.5em">
                Endereço
              </Text>

              <Stack direction="column" spacing="2em">
                <FormControl
                  isInvalid={
                    formik.touched.address && formik.errors.address != undefined
                  }
                  isRequired
                >
                  <FormLabel {...labelStyle} htmlFor="address">
                    Logradouro:
                  </FormLabel>
                  <Input
                    {...inputStyle}
                    placeholder="Rua, Avenida, Rodvia, etc."
                    id="address"
                    name="address"
                    value={formik.values.address}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  <FormErrorMessage>{formik.errors.address}</FormErrorMessage>
                </FormControl>

                <FormControl>
                  <FormLabel {...labelStyle} htmlFor="number">
                    Número da Residência:
                  </FormLabel>
                  <Input
                    {...inputStyle}
                    placeholder="número ou s/n"
                    id="number"
                    name="number"
                  />
                  <FormErrorMessage>Não é requerido.</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={false}>
                  <FormLabel {...labelStyle} htmlFor="complement">
                    Complemento:
                  </FormLabel>
                  <Input {...inputStyle} id="complement" name="complement" />
                  <FormErrorMessage>Não é requerido.</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={false} isRequired>
                  <FormLabel {...labelStyle} htmlFor="district">
                    Bairro:
                  </FormLabel>
                  <Input {...inputStyle} id="district" name="district" />
                  <FormErrorMessage>Bairro é requerido.</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={false} isRequired>
                  <FormLabel {...labelStyle} htmlFor="cep">
                    CEP:
                  </FormLabel>
                  <Input
                    {...inputStyle}
                    placeholder="Ex.: 124345-678"
                    id="cep"
                    name="cep"
                  />
                  <FormErrorMessage>CEP é requerido.</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={false} isRequired>
                  <FormLabel {...labelStyle} htmlFor="city">
                    Cidade:
                  </FormLabel>
                  <Input {...inputStyle} id="city" name="city" />
                  <FormErrorMessage>Cidade é requerida.</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={false} isRequired>
                  <FormLabel {...labelStyle} htmlFor="state">
                    Estado:
                  </FormLabel>
                  <Select
                    {...inputStyle}
                    id="state"
                    name="state"
                    placeholder="Selecione"
                  >
                    {UFS.map((uf) => (
                      <option key={uf.uf}>{`${uf.name} (${uf.uf})`}</option>
                    ))}
                  </Select>
                  <FormErrorMessage>Estado é requerido.</FormErrorMessage>
                </FormControl>
              </Stack>
            </Box>
          </Collapse>

          <Stack direction="row">
            <Button bgColor="gray.300">Anterior</Button>
            <Button type="submit" bgColor="fifth.300">
              Próximo
            </Button>
          </Stack>
        </Stack>
      </form>
    </Stack>
  );
}
