import React from "react";

import { Flex, Text } from "@chakra-ui/react";

export default function FullName({ row }) {
  return (
    <Flex gap={2}>
      <Text as={"p"} textTransform={"capitalize"}>
        {row.original.first_name} {row.original.last_name}{" "}
        {row.original.other_name}
      </Text>
    </Flex>
  );
}
