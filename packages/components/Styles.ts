import { ButtonProps, FormLabelProps, InputProps } from '@chakra-ui/react';

const button: ButtonProps = {
  bgColor: 'gray.300',
  _hover: { bgColor: 'blue.100' },
  color: 'gray.700',
};

const primaryButton: ButtonProps = {
  bgColor: 'fifth.150',
  _hover: { bgColor: 'fifth.250' },
  color: 'gray.700',
};

const formLabel: FormLabelProps = {
  fontSize: '14px',
  color: 'gray.600',
};

const field: InputProps = {
  borderColor: 'gray.400',
  borderRadius: '4px',
  bgColor: 'gray.300',
  color: 'gray.600',
};

const quantityField: InputProps = {
  textAlign: 'center',
  width: '4em',
  bgColor: 'gray.200',
  color: 'gray.600',
};

const Styles = {
  button,
  primaryButton,
  formLabel,
  field,
  quantityField,
};

export default Styles;
