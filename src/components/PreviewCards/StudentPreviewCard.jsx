import React from "react";

import {
  Flex,
  Box,
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

export default function StudentPreviewCard({ student }) {
  return (
    <Link to={`/admin/students/${student.id}`}>
      <Stack
        bg={"brand.100"}
        border={"2px solid"}
        borderColor={"transparent"}
        rounded={"xl"}
        p={4}
        spacing={4}
        shadow={"xs"}
        _hover={{
          "borderColor": "brand.700",
          "bg": "brand.100",
        }}
      >
        <VStack
          position={"relative"}
          as={"a"}
          href={`/admin/students/${student.id}`}
          gap={8}
          textAlign={"center"}
          height={"320px"}
        >
          <Box
            alignSelf={"flex-start"}
            textAlign={"left"}
            textTransform={"uppercase"}
          >
            <Text
              letterSpacing={1}
              as={"small"}
              fontWeight={"bold"}
              fontSize={"xs"}
              color={"green.700"}
              display={"block"}
            >
              Student
            </Text>

            <Badge
              lineHeight={0.8}
              as={"small"}
              colorScheme="blue"
              fontWeight={"bold"}
              letterSpacing={1}
              p={2}
            >
              ID: {student?.id}
            </Badge>
          </Box>

          <Avatar h={32} w={32} p={3} shadow={"lg"} bg={"white"}>
            <Image src="/Illustration.png" />
          </Avatar>

          <Flex gap={4} direction={"column"}>
            <Text
              fontWeight={"bold"}
              color={"brand.700"}
              as={"h3"}
              fontSize={"xl"}
              lineHeight={1}
            >
              {student.firstName} {student.lastName}
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
            {student?.class}
          </Badge>

          <Stack
            bg={"neutral.300"}
            py={2}
            px={1}
            rounded={"2xl"}
            position={"absolute"}
            right={0}
          >
            <Link>
              <IconComponent>
                <MdShare size={"18"} />
              </IconComponent>
            </Link>
            <Link>
              <IconComponent>
                <MdMailOutline size={18} />
              </IconComponent>
            </Link>
            <Link>
              <IconComponent>
                <FaPhoneAlt size={14} />
              </IconComponent>
            </Link>
          </Stack>
        </VStack>
      </Stack>
    </Link>
  );
}
