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
import { FormikErrors, FormikValues, useFormik } from 'formik';

import {
  useOrderActions,
  useOrderStates,
} from '@packages/features/order-context';
import { IDelivery } from '@packages/entities/IDelivery';
import { DeliveryType } from '@packages/enums/DeliveryType';
import UFS from '@packages/config/ufs';

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

const submitStyle = {
  bgColor: 'fifth.150',
  _hover: {
    bgColor: 'fifth.250',
  },
};

const buttonStyle = {
  bgColor: 'gray.300',
  _hover: {
    bgColor: 'gray.400',
  },
};

function validateFieldFilled(
  value: string,
  fieldName: string,
  size: number,
): string | undefined {
  if (!value) {
    return `${fieldName} é requerido(a).`;
  }

  if (value.length < size) {
    return `${fieldName} deve conter no mínimo ${size} caracteres.`;
  }

  return undefined;
}

interface FormValues extends FormikValues {
  deliveryType: DeliveryType;
  address: string;
  number: string;
  complement: string;
  district: string;
  cep: string;
  city: string;
  uf: string;
}

const validate = (values: FormValues) => {
  const errors: FormikErrors<FormValues> = {};
  const fields = [
    { key: 'address', fieldName: 'Logradouro', size: 10 },
    { key: 'district', fieldName: 'Bairro', size: 5 },
    { key: 'cep', fieldName: 'CEP', size: 9 },
    { key: 'city', fieldName: 'Cidade', size: 10 },
    { key: 'uf', fieldName: 'Estado', size: 2 },
  ];

  if (values.deliveryType === DeliveryType.MAIL) {
    fields.forEach(({ key, fieldName, size }) => {
      const message = validateFieldFilled(values[key], fieldName, size);

      if (message) {
        errors[key] = message;
      }
    });
  }

  return errors;
};

interface Props {
  onNext: () => void;
  onPrev: () => void;
}

export default function BuyerDelivery({ onNext, onPrev }: Props) {
  const { order } = useOrderStates();
  const { setOrder } = useOrderActions();

  const formik = useFormik<FormValues>({
    initialValues: {
      deliveryType: order.delivery?.type || DeliveryType.MAIL,
      address: order.delivery?.address.address || '',
      number: order.delivery?.address.number || '',
      complement: order.delivery?.address.complement || '',
      district: order.delivery?.address.district || '',
      cep: order.delivery?.address.cep || '',
      city: order.delivery?.address.city || '',
      uf: order.delivery?.address.uf || '',
    },
    validate,
    onSubmit: (values) => {
      const delivery: IDelivery = {
        type: values.deliveryType,
        address: {
          address: values.address,
          number: values.number,
          complement: values.complement,
          district: values.district,
          cep: values.cep,
          city: values.city,
          uf: values.uf,
        },
      };

      setOrder({ ...order, delivery });
      onNext();
    },
  });

  const needAddressValid = formik.values.deliveryType === DeliveryType.MAIL;

  return (
    <Stack direction="column" spacing="1em" marginBottom="5em">
      <Text {...titleStyle}>Envio</Text>

      <form onSubmit={formik.handleSubmit}>
        <Stack direction="column" spacing="2em">
          <FormControl {...fieldsetStyle}>
            <FormLabel {...fieldsetLabelStyle}>Forma de envio</FormLabel>
            <RadioGroup
              id="deliveryType"
              name="deliveryType"
              value={formik.values.deliveryType}
              onChange={(value) => formik.setFieldValue('deliveryType', value)}
            >
              <Stack direction="column" spacing="1em">
                <Stack direction="row">
                  <Radio size="lg" value={DeliveryType.MAIL} />
                  <Stack direction="column" spacing="1px">
                    <Text {...radioLabelStyle}>{DeliveryType.MAIL}</Text>
                    <FormHelperText>
                      Custo do envio será calculado e informado pelo vendedor.
                    </FormHelperText>
                  </Stack>
                </Stack>
                <Stack direction="row">
                  <Radio size="lg" value={DeliveryType.COMMUNITY} />
                  <Stack direction="column" spacing="1px">
                    <Text {...radioLabelStyle}>{DeliveryType.COMMUNITY}</Text>
                    <FormHelperText>
                      Entrega a combinar com alguém da comunidade.
                    </FormHelperText>
                  </Stack>
                </Stack>
              </Stack>
            </RadioGroup>
            <FormErrorMessage>Forma de envio é requerida.</FormErrorMessage>
          </FormControl>

          <Collapse in={formik.values.deliveryType === DeliveryType.MAIL}>
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
                      <option
                        key={uf.uf}
                        value={uf.uf}
                      >{`${uf.name} (${uf.uf})`}</option>
                    ))}
                  </Select>
                  <FormErrorMessage>{formik.errors.uf}</FormErrorMessage>
                </FormControl>
              </Stack>
            </Box>
          </Collapse>

          <Stack direction="row">
            <Button {...buttonStyle} onClick={onPrev}>
              Anterior
            </Button>
            <Button {...submitStyle} type="submit">
              Próximo
            </Button>
          </Stack>
        </Stack>
      </form>
    </Stack>
  );
}
