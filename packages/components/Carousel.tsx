import { useState, useEffect, useCallback } from 'react';
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

interface ISlite {
  id: number;
  img: string;
  label: string;
  description: string;
}

const slides: ISlite[] = [
  {
    id: 1,
    img: '/images/slides/slide01.png',
    label: '',
    description: '',
  },
  {
    id: 2,
    img: '/images/slides/slide02.png',
    label: '',
    description: '',
  },
  {
    id: 3,
    img: '/images/slides/slide03.png',
    label: '',
    description: '',
  },
  {
    id: 4,
    img: '/images/slides/slide04.png',
    label: '',
    description: '',
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
  const nextSlide = useCallback(() => {
    setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
  }, [slidesCount]);
  const setSlide = (slide: number) => {
    setCurrentSlide(slide);
  };
  const carouselStyle = {
    transition: 'all .5s',
    ml: `-${currentSlide * 100}%`,
  };

  useEffect(() => {
    const automatedSlide = setInterval(() => {
      nextSlide();
    }, SLIDES_INTERVAL_TIME);

    return () => {
      clearInterval(automatedSlide);
    };
  }, [currentSlide, nextSlide]);

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
