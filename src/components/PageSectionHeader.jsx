import React from "react";

import { Flex, Text } from "@chakra-ui/react";

export default function PageSectionHeader({ pageTitle, pageCrumb }) {
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} mb={2}>
      <Text as={"h2"} mt={0} className="" fontSize={"2xl"} fontWeight={"bold"}>
        {pageTitle}
      </Text>
      <Text as={"small"}>{pageCrumb}</Text>
    </Flex>
  );
}
