import { useState } from 'react';
import {
  Text,
  Box,
  Flex,
  useColorModeValue,
  Image,
  HStack,
  Stack,
  chakra,
} from '@chakra-ui/react';

import { useEffectOnce } from '@packages/utils/react';

interface ISlite {
  id: number;
  img: string;
  label: string;
  description: string;
}

const slides: ISlite[] = [
  {
    id: 1,
    img: 'https://images.pexels.com/photos/2599537/pexels-photo-2599537.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    label: 'First Slide',
    description: 'Nulla vitae elit libero, a pharetra augue mollis interdum.',
  },
  {
    id: 2,
    img: 'https://images.pexels.com/photos/2714581/pexels-photo-2714581.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    label: 'Second Slide',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 3,
    img: 'https://images.pexels.com/photos/2878019/pexels-photo-2878019.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
    label: 'Third Slide',
    description:
      'Praesent commodo cursus magna, vel scelerisque nisl consectetur.',
  },
  {
    id: 4,
    img: 'https://images.pexels.com/photos/1142950/pexels-photo-1142950.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    label: 'Fourth Slide',
    description: 'Nulla vitae elit libero, a pharetra augue mollis interdum.',
  },
  {
    id: 5,
    img: 'https://images.pexels.com/photos/3124111/pexels-photo-3124111.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    label: 'Fifth Slide',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
];

const SLIDES_INTERVAL_TIME = 5000;

const SlideButton = chakra(Text, {
  baseStyle: {
    position: 'absolute',
    top: '40%',
    w: 'auto',
    padding: '10px',
    color: 'white',
    fontsize: '18px',
    fontWeight: 'bold',
    borderRadius: '0 3px 3px 0',
    userSelect: 'none',
    cursor: 'pointer',
    _hover: { bgColor: 'rgba(0,0,0,0.5)' },
  },
});

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesCount = slides.length;

  const prevSlide = () => {
    setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1));
  };
  const nextSlide = () => {
    setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
  };
  const setSlide = (slide: number) => {
    setCurrentSlide(slide);
  };
  const carouselStyle = {
    transition: 'all .5s',
    ml: `-${currentSlide * 100}%`,
  };

  useEffectOnce(() => {
    const automatedSlide = setInterval(() => {
      nextSlide();
    }, SLIDES_INTERVAL_TIME);

    return () => {
      clearInterval(automatedSlide);
    };
  });

  return (
    <Flex
      w="80%"
      bg={useColorModeValue('gray.200', 'gray.600')}
      margin="auto"
      marginTop={5}
      alignItems="center"
      justifyContent="center"
    >
      <Flex w="full" pos="relative" overflow="hidden">
        <Flex h="200px" w="full" {...carouselStyle}>
          {slides.map((slide) => (
            <Box
              key={`slide-${slide.id}`}
              boxSize="full"
              shadow="md"
              flex="none"
            >
              <Image
                src={slide.img}
                alt={slide.label}
                boxSize="full"
                backgroundSize="cover"
              />
              <Stack
                p="8px 12px"
                pos="absolute"
                bottom="24px"
                textAlign="center"
                w="full"
                mb="8"
                color="white"
              >
                <Text fontSize="2xl">{slide.label}</Text>
                <Text fontSize="lg">{slide.description}</Text>
              </Stack>
            </Box>
          ))}
        </Flex>
        <SlideButton left="0" onClick={prevSlide}>
          &#10094;
        </SlideButton>
        <SlideButton right="0" onClick={nextSlide}>
          &#10095;
        </SlideButton>
        <HStack justify="center" pos="absolute" bottom="8px" w="full">
          {slides.map((slide, sindex) => (
            <Box
              key={`dots-${slide.id}`}
              cursor="pointer"
              boxSize={['7px', '15px']}
              m="0 2px"
              bg={currentSlide === sindex ? 'blackAlpha.800' : 'blackAlpha.500'}
              rounded="50%"
              display="inline-block"
              transition="background-color 0.6s ease"
              _hover={{ bg: 'blackAlpha.800' }}
              onClick={() => setSlide(sindex)}
            >
              {undefined}
            </Box>
          ))}
        </HStack>
      </Flex>
    </Flex>
  );
}
