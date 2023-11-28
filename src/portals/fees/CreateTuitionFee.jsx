import React from "react";

import { Text } from "@chakra-ui/react";
import TuitionFeeForm from "../../components/forms/fees/TuitionFeeForm";

export default function CreateTuitionFee() {
  return (
    <>
      <Text
        as={"h3"}
        fontWeight={"bold"}
        fontSize={"2xl"}
        mb={"8"}
        textAlign={"center"}
      >
        Tuition Fee Setup
      </Text>

      <TuitionFeeForm />
    </>
  );
}
