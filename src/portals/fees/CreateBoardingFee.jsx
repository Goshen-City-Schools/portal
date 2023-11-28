import React from "react";

import { Text } from "@chakra-ui/react";
import BoardingFeeForm from "../../components/forms/fees/BoardingFeeForm";

export default function CreateBoardingsFee() {
  return (
    <>
      <Text
        as={"h3"}
        fontWeight={"bold"}
        fontSize={"2xl"}
        mb={"8"}
        textAlign={"center"}
      >
        Boarding Fee Setup
      </Text>

      <BoardingFeeForm />
    </>
  );
}
