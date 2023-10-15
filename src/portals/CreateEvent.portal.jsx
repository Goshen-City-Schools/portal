import React from "react";

import { Text, Box } from "@chakra-ui/react";

export default function CreateEventPortal() {
  return (
    <Box maxWidth="lg" width={{ "base": "full", "md": "sm" }}>
      <Text as={"h3"} fontWeight={"bold"} fontSize={"2xl"} mb={"12"}>
        Create Event
      </Text>
    </Box>
  );
}
