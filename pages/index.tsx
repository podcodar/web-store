import { Text } from '@chakra-ui/react';

import CallToActionSection from '@packages/components/CallToActionSection';
import CallToActionModal from '@packages/components/dialogs/CallToActionModal';
import WhyItWorksSection from '@packages/components/WhyItWorksSection';
import MentoringSection from '@packages/components/MentoringSection';
import RoadmapSection from '@packages/components/RoadmapSection';
import Footer from '@packages/components/Footer';

export default function Home() {
  return (
    <>
      <Text color="primary.100">Cor customizada</Text>
      <CallToActionModal />
      <CallToActionSection />
      <WhyItWorksSection />
      <MentoringSection />
      <RoadmapSection />
      <Footer />
    </>
  );
}
