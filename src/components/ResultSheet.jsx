import React from "react";

import { Box, Text } from "@chakra-ui/react";
import PrintHeader from "./Header/PrintHeader";

export default function ResultSheet() {
  return (
    <Box p={6}>
      <Box
        width={"170mm"}
        height={"220mm"}
        mx={"auto"}
        p={6}
        rounded={"md"}
        bg={"white"}
        shadow={"lg"}
      >
        <PrintHeader />

        <Text
          as={"h3"}
          fontWeight={"bold"}
          fontSize={"xl"}
          py={6}
          textAlign={"center"}
        >
          Result Sheet
        </Text>
      </Box>{" "}
    </Box>
  );
}
