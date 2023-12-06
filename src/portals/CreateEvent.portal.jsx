import React from "react";

import { Text, Box } from "@chakra-ui/react";
import EventForm from "../components/forms/EventForm";
import PortalTitle from "./shared/PortalTitle";

export default function CreateEventPortal() {
  return (
    <Box maxWidth="lg" width={{ "base": "full", "md": "sm" }}>
      <PortalTitle title={"Add New Event"} />

      <EventForm />
    </Box>
  );
}
