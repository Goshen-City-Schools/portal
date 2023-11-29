import React from "react";

import { Flex, Text } from "@chakra-ui/react";

export default function UserId({ row, value }) {
  return (
    <Flex gap={2}>
      <Text
        as={"p"}
        color={"neutral.700"}
        textTransform={"uppercase"}
        letterSpacing={0.5}
        fontWeight={"semibold"}
      >
        {row.original.accountType == "staff"
          ? `GSHN/STF/${value}`
          : `GSHN/STU/${value}`}
      </Text>
    </Flex>
  );
}
