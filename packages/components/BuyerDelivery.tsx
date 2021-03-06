import {
  Box,
  Button,
  Collapse,
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
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
import Submit from './Submit';
import Styles from './Styles';

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
  textAlign: 'left',
  fontSize: '14px',
  fontWeight: 'bold',
  color: 'gray.600',
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
    { key: 'address', fieldName: 'Logradouro', size: 5 },
    { key: 'district', fieldName: 'Bairro', size: 5 },
    { key: 'cep', fieldName: 'CEP', size: 9 },
    { key: 'city', fieldName: 'Cidade', size: 5 },
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
      <Text sx={titleStyle}>Envio</Text>

      <form onSubmit={formik.handleSubmit}>
        <Stack direction="column" spacing="2em">
          <FormControl sx={fieldsetStyle}>
            <FormLabel sx={fieldsetLabelStyle}>Forma de envio</FormLabel>
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
                    <Text sx={radioLabelStyle}>{DeliveryType.MAIL}</Text>
                    <FormHelperText textAlign="left">
                      Custo do envio será calculado e informado pelo vendedor.
                    </FormHelperText>
                  </Stack>
                </Stack>
                <Stack direction="row">
                  <Radio size="lg" value={DeliveryType.COMMUNITY} />
                  <Stack direction="column" spacing="1px">
                    <Text sx={radioLabelStyle}>{DeliveryType.COMMUNITY}</Text>
                    <FormHelperText textAlign="left">
                      Entrega a combinar com alguém da comunidade.
                    </FormHelperText>
                  </Stack>
                </Stack>
              </Stack>
            </RadioGroup>
            <FormErrorMessage>Forma de envio é requerida.</FormErrorMessage>
          </FormControl>

          <Collapse in={formik.values.deliveryType === DeliveryType.MAIL}>
            <Box sx={fieldsetStyle}>
              <Text sx={fieldsetLabelStyle} marginBottom="0.5em">
                Endereço
              </Text>

              <Stack direction="column" spacing="2em">
                <FormControl
                  isInvalid={
                    formik.touched.address && formik.errors.address != undefined
                  }
                  isRequired={needAddressValid}
                >
                  <FormLabel sx={Styles.formLabel} htmlFor="address">
                    Logradouro:
                  </FormLabel>
                  <Input
                    sx={Styles.formField}
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
                  <FormLabel sx={Styles.formLabel} htmlFor="number">
                    Número da Residência:
                  </FormLabel>
                  <Input
                    sx={Styles.formField}
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
                  <FormLabel sx={Styles.formLabel} htmlFor="complement">
                    Complemento:
                  </FormLabel>
                  <Input
                    sx={Styles.formField}
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
                  <FormLabel sx={Styles.formLabel} htmlFor="district">
                    Bairro:
                  </FormLabel>
                  <Input
                    sx={Styles.formField}
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
                  <FormLabel sx={Styles.formLabel} htmlFor="cep">
                    CEP:
                  </FormLabel>
                  <InputMask
                    sx={Styles.formField}
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
                  <FormLabel sx={Styles.formLabel} htmlFor="city">
                    Cidade:
                  </FormLabel>
                  <Input
                    sx={Styles.formField}
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
                  <FormLabel sx={Styles.formLabel} htmlFor="uf">
                    Estado:
                  </FormLabel>
                  <Select
                    sx={Styles.formField}
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
            <Button sx={Styles.button} onClick={onPrev}>
              Anterior
            </Button>
            <Submit>Próximo</Submit>
          </Stack>
        </Stack>
      </form>
    </Stack>
  );
}
