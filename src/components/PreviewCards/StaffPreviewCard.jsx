import React from "react";

import {
  Flex,
  Text,
  Stack,
  Avatar,
  Image,
  VStack,
  Badge,
} from "@chakra-ui/react";
import IconComponent from "../Icon.component";
import { MdMailOutline, MdShare } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function StaffPreviewCard({ staff }) {
  return (
    <Link to={`/admin/staff/${staff?.portalId}`}>
      <Stack
        bg={"neutral.100"}
        border={"2px solid"}
        borderColor={"transparent"}
        rounded={"xl"}
        p={4}
        spacing={4}
        shadow={"xs"}
        _hover={{
          "borderColor": "accent.700",
        }}
      >
        <VStack
          position={"relative"}
          gap={8}
          textAlign={"center"}
          height={"280px"}
        >
          <Badge
            as={"small"}
            colorScheme="purple"
            bg={"accent.700"}
            color={"whiteAlpha.700"}
            fontWeight={"bold"}
            px={2}
            py={1}
            rounded={"lg"}
            alignSelf={"flex-start"}
            textAlign={"left"}
            textTransform={"uppercase"}
          >
            Staff ID:{" "}
            <Text
              as={"span"}
              color={"white"}
              letterSpacing={1}
              lineHeight={0.8}
            >
              {staff?.portalId}
            </Text>
          </Badge>

          <Avatar h={24} w={24} p={3} shadow={"lg"} bg={"white"}>
            <Image src="/Illustration.png" />
          </Avatar>

          <Flex gap={4} direction={"column"}>
            <Text
              fontWeight={"bold"}
              color={"accent.700"}
              as={"h3"}
              fontSize={"lg"}
              lineHeight={1}
            >
              {staff.firstName} {staff.lastName}
            </Text>
          </Flex>

          <Badge
            lineHeight={0.8}
            color={"neutral.700"}
            as={"small"}
            fontWeight={"bold"}
            textTransform={"uppercase"}
            letterSpacing={1}
            p={2}
          >
            {staff?.roles[0]}
          </Badge>

          <Stack
            bg={"neutral.300"}
            py={1}
            px={0.8}
            rounded={"2xl"}
            position={"absolute"}
            right={0}
            spacing={0}
          >
            <Link to={"/admin"}>
              <IconComponent>
                <MdShare size={"14"} />
              </IconComponent>
            </Link>
            <Link to={"/admin"}>
              <IconComponent>
                <MdMailOutline size={14} />
              </IconComponent>
            </Link>
            <Link to={"/admin"}>
              <IconComponent>
                <FaPhoneAlt size={10} />
              </IconComponent>
            </Link>
          </Stack>
        </VStack>
      </Stack>
    </Link>
  );
}
