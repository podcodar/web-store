import { FaAddressBook, FaBus, FaHandshake, FaShopify } from 'react-icons/fa';
import { Box } from '@chakra-ui/react';
import { Step, Steps, useSteps } from 'chakra-ui-steps';

import BuyerContact from '@packages/components/BuyerContact';
import BuyerDelivery from '@packages/components/BuyerDelivery';
import BuyerOrder from '@packages/components/BuyerOrder';
import OrderSuccessful from '@packages/components/OrderSuccessful';
import Footer from '@packages/components/Footer';

export default function Checkout() {
  const { activeStep, nextStep, prevStep } = useSteps({ initialStep: 0 });

  const steps = [
    {
      label: 'Contato',
      content: <BuyerContact onNext={nextStep} />,
      icon: FaAddressBook,
    },
    {
      label: 'Envio',
      content: <BuyerDelivery onPrev={prevStep} onNext={nextStep} />,
      icon: FaBus,
    },
    {
      label: 'Finalizar',
      content: <BuyerOrder onPrev={prevStep} onNext={nextStep} />,
      icon: FaHandshake,
    },
    {
      label: 'Pedido Realizado',
      content: <OrderSuccessful />,
      icon: FaShopify,
    },
  ];

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
      </Box>
      <Footer />
    </>
  );
}
