import { Stack, Icon } from '@chakra-ui/react';
import {
  FaFacebook,
  FaInstagramSquare,
  FaLinkedin,
  FaGithub,
} from 'react-icons/fa';

import Link from '@packages/components/Link';
import { links } from '@packages/config/site';

export default function SocialIconLinks() {
  return (
    <Stack
      spacing="1rem"
      justifyContent="center"
      direction="row"
      fontSize="1.3rem"
    >
      <Link href="/">
        <Icon as={FaFacebook} color="white" />
      </Link>
      <Link href="/">
        <Icon as={FaInstagramSquare} color="white" />
      </Link>
      <Link href={links.linkedin}>
        <Icon as={FaLinkedin} color="white" />
      </Link>
      <Link href={links.github}>
        <Icon as={FaGithub} color="white" />
      </Link>
    </Stack>
  );
}
