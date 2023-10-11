import React from 'react';

import { Box } from '@chakra-ui/react';

export default function PageWrapper({ children }) {
  return <Box padding={6}>{children}</Box>;
}
