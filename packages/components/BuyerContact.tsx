import { FaPhone, FaUser, FaEnvelope } from 'react-icons/fa';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  Icon,
  InputProps,
  FormLabelProps,
  Button,
} from '@chakra-ui/react';
import { useFormik } from 'formik';

import InputMask, { phoneMask } from './InputMask';

const labelStyle: FormLabelProps = {
  fontSize: '14px',
  color: 'gray.600',
};

const inputStyle: InputProps = {
  borderColor: 'gray.400',
  borderRadius: '4px',
  bgColor: 'gray.300',
};

const iconStyle = {
  color: 'gray.500',
};

export default function BuyerContact() {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
    },
    validate: (values) => {
      const errors: any = {};

      if (!values.name) {
        errors.name = 'Nome é requerido.';
      } else if (values.name.length < 5) {
        errors.name = 'Nome dever conter no mínimo 5 caracteres.';
      }

      if (!values.email) {
        errors.email = 'E-mail é requerido.';
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = 'E-mail inválido.';
      }

      if (!values.phone) {
        errors.phone = 'Telefone é requerido.';
      } else if (values.phone.length < 13) {
        errors.phone = 'Telefone inválido.';
      }

      return errors;
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Stack direction="column" spacing="1em" marginBottom="5em">
      <Text marginTop="1em" fontSize="25px" fontWeight="bold" color="black">
        Contato
      </Text>

      <form onSubmit={formik.handleSubmit}>
        <Stack direction="column" spacing="2em">
          <FormControl
            isInvalid={formik.touched.name && formik.errors.name != undefined}
            isRequired
          >
            <FormLabel {...labelStyle} htmlFor="name">
              Nome:
            </FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FaUser} {...iconStyle} />
              </InputLeftElement>
              <Input
                {...inputStyle}
                id="name"
                name="name"
                value={formik.values.name}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
            </InputGroup>
            <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={formik.touched.email && formik.errors.email != undefined}
            isRequired
          >
            <FormLabel {...labelStyle} htmlFor="email">
              E-mail:
            </FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FaEnvelope} {...iconStyle} />
              </InputLeftElement>
              <Input
                {...inputStyle}
                id="email"
                name="email"
                type="email"
                value={formik.values.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
            </InputGroup>
            <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={formik.touched.phone && formik.errors.phone != undefined}
            isRequired
          >
            <FormLabel {...labelStyle} htmlFor="phone">
              Telefone:
            </FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FaPhone} {...iconStyle} />
              </InputLeftElement>
              <InputMask
                {...inputStyle}
                paddingLeft="2.5em"
                id="phone"
                name="phone"
                value={formik.values.phone}
                mask={phoneMask}
                maxLength={14}
                onBlur={formik.handleBlur}
                onMask={(phone) => formik.setFieldValue('phone', phone)}
              />
            </InputGroup>
            <FormErrorMessage>{formik.errors.phone}</FormErrorMessage>
          </FormControl>

          <Stack direction="row">
            <Button type="submit" bgColor="fifth.300">
              Próximo
            </Button>
          </Stack>
        </Stack>
      </form>
    </Stack>
  );
}
