import { Box, Button } from '@chakra-ui/react';

export default function CartResume() {
  return (
    <Box>
      <Button bgColor="fifth.150" _hover={{ bgColor: 'fifth.250' }}>
        Finalizar Compra
      </Button>
    </Box>
  );
}
