import React from "react";

import { Flex, Text } from "@chakra-ui/react";

export default function RowId({ row }) {
  return (
    <Flex gap={2} wrap={"wrap"} flexShrink={1}>
      <Text as={"p"} color={"neutral.700"} fontWeight={"bold"}>
        {Number(row.id) + 1}
      </Text>
    </Flex>
  );
}
