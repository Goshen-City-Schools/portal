import React from "react";

import { Flex, Text } from "@chakra-ui/react";

export default function UserId({ row, value, type }) {
  return (
    <Flex gap={2}>
      <Text
        as={"p"}
        color={"neutral.700"}
        textTransform={"uppercase"}
        letterSpacing={0.5}
        fontWeight={"semibold"}
      >
        {type == "staff" ? `GSHN/STF/${value}` : `GSHN/STU/${value}`}
      </Text>
    </Flex>
  );
}
