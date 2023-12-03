import React from "react";

import { Stack, Text } from "@chakra-ui/react";
import GuardianForm from "../components/forms/GuardianForm";

export default function AddGuardianPortal() {
  return (
    <Stack w={"full"}>
      <Text as={"h3"} fontSize={"2xl"} fontWeight={"bold"} textAlign={"center"}>
        Add New Guardian
      </Text>
      <GuardianForm />
    </Stack>
  );
}
