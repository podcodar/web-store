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
} from '@chakra-ui/react';

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
  return (
    <Stack direction="column" spacing="1em" marginBottom="5em">
      <Text marginTop="1em" fontSize="25px" fontWeight="bold" color="black">
        Contato
      </Text>

      <Stack direction="column" spacing="2em">
        <FormControl isRequired>
          <FormLabel {...labelStyle}>Nome:</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Icon as={FaUser} {...iconStyle} />
            </InputLeftElement>
            <Input id="name" {...inputStyle} />
          </InputGroup>
          <FormErrorMessage>Nome é requerido.</FormErrorMessage>
        </FormControl>

        <FormControl isRequired>
          <FormLabel {...labelStyle}>E-mail:</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Icon as={FaEnvelope} {...iconStyle} />
            </InputLeftElement>
            <Input id="email" type="email" {...inputStyle} />
          </InputGroup>
          <FormErrorMessage>Email é requerido.</FormErrorMessage>
        </FormControl>

        <FormControl isRequired>
          <FormLabel {...labelStyle}>Telefone:</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Icon as={FaPhone} {...iconStyle} />
            </InputLeftElement>
            <Input id="phone" type="tel" {...inputStyle} />
          </InputGroup>
          <FormErrorMessage>Telefone é requerido.</FormErrorMessage>
        </FormControl>
      </Stack>
    </Stack>
  );
}
