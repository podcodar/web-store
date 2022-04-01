import { Box, Grid, GridItem, StyleProps, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const RELEASE_DATE = '2022-04-08T21:00:00';

const boxStyle: StyleProps = {
  padding: '0.5em 0em',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const gridStyle: StyleProps = {
  backgroundColor: 'gray.300',
  padding: '0.4em',
  width: '5em',
};

const titleStyle: StyleProps = {
  fontWeight: 'bold',
  fontSize: '25px',
  marginTop: '1em',
  marginBottom: '0.5em',
};

const subtitleStyle: StyleProps = {
  fontWeight: 'bold',
  fontSize: '18px',
  marginTop: '1em',
};

const numberStyle: StyleProps = {
  fontWeight: 'bold',
  fontSize: '35px',
};

const unitStyle: StyleProps = {
  fontWeight: 'bold',
  fontSize: '12px',
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
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) {
    return <Box />;
  }

  return (
    <Box sx={boxStyle}>
      <Text sx={titleStyle}>Faltam</Text>

      <Grid templateColumns="repeat(4, 1fr)" gap="2px">
        <GridItem sx={gridStyle}>
          <Text sx={numberStyle}>{String(timeLeft.days).padStart(2, '0')}</Text>
        </GridItem>
        <GridItem sx={gridStyle}>
          <Text sx={numberStyle}>
            {String(timeLeft.hours).padStart(2, '0')}
          </Text>
        </GridItem>
        <GridItem sx={gridStyle}>
          <Text sx={numberStyle}>
            {String(timeLeft.minutes).padStart(2, '0')}
          </Text>
        </GridItem>
        <GridItem sx={gridStyle}>
          <Text sx={numberStyle}>
            {String(timeLeft.seconds).padStart(2, '0')}
          </Text>
        </GridItem>
        <GridItem sx={gridStyle}>
          <Text sx={unitStyle}>Dias</Text>
        </GridItem>
        <GridItem sx={gridStyle}>
          <Text sx={unitStyle}>Horas</Text>
        </GridItem>
        <GridItem sx={gridStyle}>
          <Text sx={unitStyle}>Minutos</Text>
        </GridItem>
        <GridItem sx={gridStyle}>
          <Text sx={unitStyle}>Segundos</Text>
        </GridItem>
      </Grid>

      <Text sx={subtitleStyle}>Para o lançamento!</Text>
    </Box>
  );
}
