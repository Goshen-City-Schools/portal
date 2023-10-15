import React from "react";

import { Text, Box } from "@chakra-ui/react";

export default function CreateStudentPortal() {
  return (
    <Box maxWidth="lg" width={{ "base": "full", "md": "sm" }}>
      <Text as={"h3"} fontWeight={"bold"} fontSize={"2xl"} mb={"12"}>
        Create Student
      </Text>
    </Box>
  );
}
