import { Box, StyleProps, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const RELEASE_DATE = '2022/04/01';

const boxStyle: StyleProps = {
  backgroundColor: 'gray.100',
  padding: '2em 0em',
  textAlign: 'center',
};

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(): TimeLeft | undefined {
  const releaseDate = new Date(RELEASE_DATE);
  const currentDate = new Date();
  const difference = releaseDate.getTime() - currentDate.getTime();

  if (difference <= 0) {
    return undefined;
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export default function LaunchCountDown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | undefined>();

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  });

  if (!timeLeft) {
    return <Box />;
  }

  const days = `${timeLeft.days} ${timeLeft.days === 1 ? 'dia' : 'dias'}`;
  const hours = `${timeLeft.hours} ${timeLeft.hours === 1 ? 'hora' : 'horas'}`;
  const minutes = `${timeLeft.minutes} ${
    timeLeft.minutes === 1 ? 'minuto' : 'minutos'
  }`;

  const seconds = `${timeLeft.seconds} ${
    timeLeft.seconds === 1 ? 'segundo' : 'segundos'
  }`;

  const template = `${days} ${hours} ${minutes} ${seconds}`;

  return (
    <Box sx={boxStyle}>
      <Text>Faltam</Text>
      <Text>{template}</Text>
      <Text>para o lançamento!</Text>
    </Box>
  );
}
