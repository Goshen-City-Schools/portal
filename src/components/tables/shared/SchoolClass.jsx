import React from "react";

import { Flex, Text } from "@chakra-ui/react";
import useClassDetails from "../../../hooks/useClassDetails";

export default function SchoolClass({ value }) {
  const { classDetails, loading } = useClassDetails(value);

  return (
    <Flex gap={2}>
      <Text as={"p"} color={"neutral.700"}>
        {loading ? "Loading..." : classDetails.name || ""}
      </Text>
    </Flex>
  );
}
