import {
  Button,
  FormControl,
  FormControlProps,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Text,
  TextProps,
} from '@chakra-ui/react';
import { useFormik } from 'formik';

import { EPaymentMethods } from '@packages/enums/EPaymentMethods';

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

export default function BuyerPayment() {
  const formik = useFormik({
    initialValues: {
      paymentMethod: EPaymentMethods.PIX,
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Stack direction="column" spacing="1em" marginBottom="5em">
      <Text {...titleStyle}>Pagamento</Text>

      <form onSubmit={formik.handleSubmit}>
        <Stack direction="column" spacing="2em">
          <FormControl {...fieldsetStyle}>
            <FormLabel {...fieldsetLabelStyle}>Forma de Pagamento</FormLabel>
            <RadioGroup
              id="paymentMethod"
              name="paymentMethod"
              value={formik.values.paymentMethod}
              onChange={(value) => formik.setFieldValue('paymentMethod', value)}
            >
              <Stack direction="column" spacing="1em">
                <Stack direction="row">
                  <Radio size="lg" value={EPaymentMethods.PIX} />
                  <Stack direction="column" spacing="1px">
                    <Text {...radioLabelStyle}>{EPaymentMethods.PIX}</Text>
                    <FormHelperText>Vencimento em até 1 hora.</FormHelperText>
                  </Stack>
                </Stack>
                <Stack direction="row">
                  <Radio size="lg" value={EPaymentMethods.BANKSLIP} />
                  <Stack direction="column" spacing="1px">
                    <Text {...radioLabelStyle}>{EPaymentMethods.BANKSLIP}</Text>
                    <FormHelperText>Vencimento em 1 dia útil.</FormHelperText>
                  </Stack>
                </Stack>
              </Stack>
            </RadioGroup>
          </FormControl>

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
