import React from "react";

import { Text, Box } from "@chakra-ui/react";
import EventForm from "../components/forms/EventForm";
import SchoolClassForm from "../components/forms/SchoolClassForm";

export default function CreateSubClassPortal() {
  return (
    <Box maxWidth="lg" width={{ "base": "full", "md": "sm" }}>
      <Text
        as={"h3"}
        fontWeight={"bold"}
        textAlign={"center"}
        fontSize={"2xl"}
        mb={"6"}
      >
        Add New Sub-class
      </Text>

      <SchoolClassForm />
    </Box>
  );
}
