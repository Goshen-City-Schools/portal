import React from "react";

import { Text, Box } from "@chakra-ui/react";
import CreateEventForm from "../components/forms/CreateEventForm";

export default function CreateEventPortal() {
  return (
    <Box maxWidth="lg" width={{ "base": "full", "md": "sm" }}>
      <Text
        as={"h3"}
        fontWeight={"bold"}
        textAlign={"center"}
        fontSize={"2xl"}
        mb={"6"}
      >
        Add New Event
      </Text>

      <CreateEventForm />
    </Box>
  );
}
