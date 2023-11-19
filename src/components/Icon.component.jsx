import React from "react";

import { Box } from "@chakra-ui/react";

export default function IconComponent({ children, click, color, classes }) {
  return (
    <Box
      onClick={click}
      className={`icon h-6 w-6 flex items-center justify-center ${classes}`}
      color={color}
    >
      {children}
    </Box>
  );
}
