import React from "react";

import { Stack, Text } from "@chakra-ui/react";
import GuardianForm from "../components/forms/GuardianForm";
import PortalTitle from "./shared/PortalTitle";

export default function AddGuardianPortal() {
  return (
    <Stack w={"full"}>
      <PortalTitle title={"Add New Guardian"} />

      <GuardianForm />
    </Stack>
  );
}
