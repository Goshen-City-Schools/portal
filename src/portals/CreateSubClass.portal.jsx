import React from "react";

import { Text, Box } from "@chakra-ui/react";
import EventForm from "../components/forms/EventForm";
import SchoolClassForm from "../components/forms/SchoolClassForm";
import { useState } from "react";
import PortalTitle from "./shared/PortalTitle";

export default function CreateSubClassPortal() {
  return (
    <Box maxWidth="lg" width={{ "base": "full", "md": "sm" }}>
      <PortalTitle title={"Add New Sub-class"} />

      <SchoolClassForm />
    </Box>
  );
}
