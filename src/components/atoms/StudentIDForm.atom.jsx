import React from "react";

import { Flex, Box, Text } from "@chakra-ui/react";
import { useUser } from "../../app/contexts/UserContext";

function StudentIDFormAtom() {
  const { user } = useUser();

  console.log(user);

  return (
    <Flex gap={8} mt={4} justifyContent={"start"}>
      <Box className="w-48 h-48 flex-shrink-0 rounded-lg border"></Box>

      <Flex direction="column" gap={4} className="w-full">
        <Flex gap={8}>
          <div className="border-b h-max w-full">
            <Text as={"small"} fontWeight={"bold"}>
              Student name
            </Text>
            <Text className="mt-0" as={"h3"}>
              {user.first_name} {user.last_name}
            </Text>
          </div>

          <div className="border-b h-max whitespace-nowrap w-full">
            <Text as={"small"} fontWeight={"bold"}>
              Class
            </Text>
            <Text className="mt-0 capitalize" as={"h3"}>
              {user?.studentClass?.schoolClass?.name} {user?.studentClass?.name}
            </Text>
          </div>
        </Flex>

        <Flex gap={8}>
          {/* Portal Id */}
          <div className="border-b h-max w-full">
            <Text as={"small"} fontWeight={"bold"}>
              PortalId
            </Text>
            <Text className="mt-0" as={"h3"}>
              {user?.studentId}
            </Text>
          </div>

          {/* Session */}
          <div className="border-b h-max w-full">
            <Text as={"small"} fontWeight={"bold"}>
              Session
            </Text>
            <Text className="mt-0 capitalize" as={"h3"}>
              {user?.studentClass?.schoolClass?.name} {user?.studentClass?.name}
            </Text>
          </div>

          {/* Term */}
          <div className="border-b h-max w-full">
            <Text as={"small"} fontWeight={"bold"}>
              Term
            </Text>
            <Text className="mt-0 capitalize" as={"h3"}>
              {user?.studentClass?.schoolClass?.name} {user?.studentClass?.name}
            </Text>
          </div>
        </Flex>

        <Flex gap={8}>
          {/* Payment purpose */}
          <div className="border-b h-max w-full">
            <Text as={"small"} fontWeight={"bold"}>
              Payment Purpose
            </Text>
            <Text className="mt-0" as={"h3"}>
              {"SCHOOL FEES"}
            </Text>
          </div>

          {/* Amount Payable */}
          <div className="border-b h-max w-full">
            <Text as={"small"} fontWeight={"bold"}>
              Amount payable
            </Text>
            <Text className="mt-0" as={"h3"}>
              {"SCHOOL FEES"}
            </Text>
          </div>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default StudentIDFormAtom;
