import React from "react";

import { Flex, Text } from "@chakra-ui/react";
import { useClassDetails } from "../../../hooks/school_classes";

export default function SchoolClass({ value }) {
  const { classDetails, loading } = useClassDetails(value);

  return (
    <Flex gap={2}>
      <Text as={"p"} color={"neutral.700"} className="capitalize">
        {loading
          ? "Loading..."
          : `${classDetails?.schoolClass.name} ${classDetails?.name}` || ""}
      </Text>
    </Flex>
  );
}
