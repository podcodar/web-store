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
          <FormControl isInvalid={formik.errors.name != undefined} isRequired>
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
                onChange={formik.handleChange}
              />
            </InputGroup>
            <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={formik.errors.email != undefined} isRequired>
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
                onChange={formik.handleChange}
              />
            </InputGroup>
            <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired>
            <FormLabel {...labelStyle} htmlFor="phone">
              Telefone:
            </FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FaPhone} {...iconStyle} />
              </InputLeftElement>
              <Input
                {...inputStyle}
                id="phone"
                name="phone"
                type="tel"
                value={formik.values.phone}
                onChange={formik.handleChange}
              />
            </InputGroup>
            <FormErrorMessage>Telefone é requerido.</FormErrorMessage>
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
