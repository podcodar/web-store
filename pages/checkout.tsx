import {
  FaAddressBook,
  FaBus,
  FaCommentsDollar,
  FaHandshake,
} from 'react-icons/fa';
import { Box, Button, Flex, Stack } from '@chakra-ui/react';
import { Step, Steps, useSteps } from 'chakra-ui-steps';

import BuyerContact from '@packages/components/BuyerContact';
import BuyerDelivery from '@packages/components/BuyerDelivery';
import BuyerPayment from '@packages/components/BuyerPayment';
import BuyerOrder from '@packages/components/BuyerOrder';
import Footer from '@packages/components/Footer';

const steps = [
  { label: 'Contato', content: <BuyerContact />, icon: FaAddressBook },
  { label: 'Envio', content: <BuyerDelivery />, icon: FaBus },
  { label: 'Pagamento', content: <BuyerPayment />, icon: FaCommentsDollar },
  { label: 'Fechar Pedido', content: <BuyerOrder />, icon: FaHandshake },
];

export default function Checkout() {
  const { activeStep, nextStep, prevStep } = useSteps({ initialStep: 0 });

  return (
    <>
      <Box minH="40em" w="80%" margin="auto" marginTop="1em">
        <Steps activeStep={activeStep} color="first.500" colorScheme="first">
          {steps.map(({ label, icon, content }) => (
            <Step key={label} label={label} icon={icon}>
              {content}
            </Step>
          ))}
        </Steps>
        <Flex w="full" margin="1em" justify="center">
          <Stack direction="row">
            <Button isDisabled={activeStep < 1} onClick={prevStep}>
              Anterior
            </Button>
            <Button isDisabled={activeStep > steps.length} onClick={nextStep}>
              {activeStep >= steps.length - 1 ? 'Finalizar' : 'Próximo'}
            </Button>
          </Stack>
        </Flex>
      </Box>
      <Footer />
    </>
  );
}
