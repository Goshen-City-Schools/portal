import React from "react";

import { Box, Text, Flex } from "@chakra-ui/react";

export default function AccountCreatedScreen({ type, data, email }) {
  return (
    <Box w={"full"} maxW={"2xl"} textAlign={"center"}>
      <Text as={"h2"} mb={6}>
        Account Successfully Created!
      </Text>

      <Flex
        mb={6}
        direction={"column"}
        textAlign={"center"}
        w={"full"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Flex>
          <Text>
            {type?.toLocaleLowerCase() == "staff"
              ? "Staff ID: "
              : type?.toLocaleLowerCase() == "student"
              ? "Student ID: "
              : "Username: "}
            <strong>{data.id}</strong>
          </Text>
        </Flex>
        <Flex>
          <Text>
            Password:&nbsp; <strong>{data.id}</strong>
          </Text>
        </Flex>
      </Flex>

      <Text as={"p"} fontSize={"xs"} letterSpacing={0.4}>
        Default password should be changed within <strong>7 days!</strong>
      </Text>

      <Text
        as={"p"}
        fontSize={"xs"}
        color={"accent.700"}
        lineHeight={1}
        fontWeight={"bold"}
        my={4}
      >
        Welcome email with login details has been forwarded to:{" "}
        <strong>
          &nbsp;
          {email}
        </strong>
      </Text>
    </Box>
  );
}