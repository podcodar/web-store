import { FaAddressBook, FaBus, FaHandshake } from 'react-icons/fa';
import { Box } from '@chakra-ui/react';
import { Step, Steps, useSteps } from 'chakra-ui-steps';

import BuyerContact from '@packages/components/BuyerContact';
import BuyerDelivery from '@packages/components/BuyerDelivery';
import BuyerOrder from '@packages/components/BuyerOrder';
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
      label: 'Fechar Pedido',
      content: <BuyerOrder onPrev={prevStep} />,
      icon: FaHandshake,
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
