import React from "react";

import { Text, Box } from "@chakra-ui/react";
import FeeForm from "../components/forms/TuitionFeeForm";

export default function AddNewFeeTypePortal() {
  return (
    <Box maxWidth="lg" width={{ "base": "full", "md": "sm" }}>
      <Text
        as={"h3"}
        textAlign={"center"}
        fontWeight={"bold"}
        fontSize={"2xl"}
        mb={"8"}
      >
        New Fee Setup
      </Text>

      <FeeForm />
    </Box>
  );
}
