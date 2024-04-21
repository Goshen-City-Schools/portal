import React from "react";
import PrintHeader from "../Header/PrintHeader";

import { Text, Flex, Box, Divider } from "@chakra-ui/react";
import StudentIDFormAtom from "./StudentIDForm.atom";

export const ComponentToPrint = React.forwardRef((props, ref) => {
  return (
    <div
      className="w-full max-w-3xl mx-auto bg-white shadow-md p-8 rounded-lg"
      ref={ref}
    >
      <PrintHeader />

      <Divider />

      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <div className=""></div>
        <Text
          as={"h2"}
          mx={"auto"}
          textAlign={"center"}
          w={"max-content"}
          fontSize={"large"}
          fontWeight={"bold"}
          className="bg-blue-700 mb-2 mt-2 text-white px-4 py-2 rounded-md"
        >
          Invoice
        </Text>

        <Box opacity={".8"}>
          <Text color={"red.300"} as={"small"} fontWeight={"bold"}>
            Inv Ref:
          </Text>
          <Text
            color={"blue.900"}
            as={"p"}
            fontSize={"small"}
            fontWeight={"bold"}
          >
            A89G54C
          </Text>
        </Box>
      </Flex>

      <Divider />

      <StudentIDFormAtom />

      {/* Signature */}

      <div className="w-max mx-auto text-center mt-16">
        <Text borderTop={"2px"}>Mgnt. Signatory</Text>
      </div>
    </div>
  );
});
