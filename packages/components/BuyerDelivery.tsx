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

import InputMask, { cepMask } from './InputMask';

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
      number: '',
      complement: '',
      district: '',
      cep: '',
      city: '',
      uf: '',
    },
    validate: (values) => {
      const errors = {};

      if (values.deliveryWay === EDeliveryWays.MAIL) {
        isReqHasMinSize(values, 'address', 'Logradouro', errors, 10);
        isReqHasMinSize(values, 'district', 'Bairro', errors, 5);
        isReqHasMinSize(values, 'cep', 'CEP', errors, 9);
        isReqHasMinSize(values, 'city', 'Cidade', errors, 10);
        isReqHasMinSize(values, 'uf', 'Estado', errors, 2);
      }

      return errors;
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const needAddressValid = formik.values.deliveryWay === EDeliveryWays.MAIL;

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
                  isRequired={needAddressValid}
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
                    value={formik.values.number}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  <FormErrorMessage>Não é requerido.</FormErrorMessage>
                </FormControl>

                <FormControl>
                  <FormLabel {...labelStyle} htmlFor="complement">
                    Complemento:
                  </FormLabel>
                  <Input
                    {...inputStyle}
                    id="complement"
                    name="complement"
                    value={formik.values.complement}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  <FormErrorMessage>Não é requerido.</FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={
                    formik.touched.district &&
                    formik.errors.district !== undefined
                  }
                  isRequired={needAddressValid}
                >
                  <FormLabel {...labelStyle} htmlFor="district">
                    Bairro:
                  </FormLabel>
                  <Input
                    {...inputStyle}
                    id="district"
                    name="district"
                    value={formik.values.district}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  <FormErrorMessage>{formik.errors.district}</FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={
                    formik.touched.cep && formik.errors.cep !== undefined
                  }
                  isRequired={needAddressValid}
                >
                  <FormLabel {...labelStyle} htmlFor="cep">
                    CEP:
                  </FormLabel>
                  <InputMask
                    {...inputStyle}
                    placeholder="Ex.: 12345-678"
                    id="cep"
                    name="cep"
                    mask={cepMask}
                    maxLength={9}
                    value={formik.values.cep}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  <FormErrorMessage>{formik.errors.cep}</FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={
                    formik.touched.city && formik.errors.city !== undefined
                  }
                  isRequired={needAddressValid}
                >
                  <FormLabel {...labelStyle} htmlFor="city">
                    Cidade:
                  </FormLabel>
                  <Input
                    {...inputStyle}
                    id="city"
                    name="city"
                    value={formik.values.city}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  <FormErrorMessage>{formik.errors.city}</FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={
                    formik.touched.uf && formik.errors.uf !== undefined
                  }
                  isRequired={needAddressValid}
                >
                  <FormLabel {...labelStyle} htmlFor="uf">
                    Estado:
                  </FormLabel>
                  <Select
                    {...inputStyle}
                    placeholder="Selecione"
                    id="uf"
                    name="uf"
                    value={formik.values.uf}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  >
                    {UFS.map((uf) => (
                      <option key={uf.uf}>{`${uf.name} (${uf.uf})`}</option>
                    ))}
                  </Select>
                  <FormErrorMessage>{formik.errors.uf}</FormErrorMessage>
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
