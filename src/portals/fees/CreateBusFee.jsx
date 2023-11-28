import React from "react";

import { Text } from "@chakra-ui/react";
import BusFeeForm from "../../components/forms/fees/BusFeeForm";

export default function CreateBusFee() {
  return (
    <>
      <Text
        as={"h3"}
        fontWeight={"bold"}
        fontSize={"2xl"}
        mb={"8"}
        textAlign={"center"}
      >
        Bus Route Fee Setup
      </Text>

      <BusFeeForm />
    </>
  );
}
