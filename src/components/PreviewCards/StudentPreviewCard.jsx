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
import useStudentClassDetails from "../../hooks/SchoolClasses";

export default function StudentPreviewCard({ data }) {
  const { classDetails, subclassDetails } = useStudentClassDetails(
    data?.schoolClass,
    data?.subClass
  );

  return (
    <Link to={`/admin/students/${data.portalId}`}>
      <Stack
        bg={"blue.50"}
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
          gap={8}
          textAlign={"center"}
          height={"280px"}
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
              ID: {data?.portalId}
            </Badge>
          </Box>

          <Avatar h={24} w={24} shadow={"lg"} bg={"white"} overflow={"hidden"}>
            <Image
              src={
                data.avatarImageURL ? data.avatarImageURL : "/Illustration.png"
              }
              h={24}
              w={24}
              loading="lazy"
              objectFit={"cover"}
            />
          </Avatar>

          <Flex gap={4} direction={"column"}>
            <Text
              fontWeight={"bold"}
              color={"brand.700"}
              as={"h3"}
              fontSize={"lg"}
              textTransform={"capitalize"}
              lineHeight={1}
            >
              {data.firstName} {data.lastName}
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
            {classDetails?.name} {subclassDetails?.name}
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
                <MdShare size={"12"} />
              </IconComponent>
            </Link>
            <Link to={"/admin"}>
              <IconComponent>
                <MdMailOutline size={12} />
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
