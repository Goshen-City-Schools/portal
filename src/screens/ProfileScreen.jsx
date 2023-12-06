import React from "react";

import { Box, Flex, Text, Button, Grid, VStack } from "@chakra-ui/react";
import Avatar from "../components/Avatar.component";
import dayjs from "dayjs";
import { MdChangeCircle, MdShare } from "react-icons/md";
import UpdateAvatarButton from "../components/Buttons/UpdateAvatarButton";
import { useState } from "react";

export default function ProfileScreen({ user }) {
  const [selectedFile, setSelectedFile] = useState(null);
  return (
    <Box
      bg={"white"}
      px={6}
      py={6}
      rounded={"lg"}
      mt={4}
      h={{ base: "full", md: "320px" }}
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        gap={8}
        alignItems={"center"}
        h={"full"}
      >
        <Grid gap={4}>
          <Avatar
            width={156}
            height={156}
            imageUrl={
              selectedFile
                ? URL.createObjectURL(selectedFile)
                : user.avatarImageURL
                ? user.avatarImageURL
                : "/avatar.png"
            }
          />

          <UpdateAvatarButton
            selectedFile={selectedFile}
            theUser={user}
            setSelectedFile={setSelectedFile}
          />
        </Grid>

        <Flex direction={"column"} w={"full"} h={"full"} position={"relative"}>
          <Flex
            gap={8}
            h={"full"}
            alignItems={"center"}
            justifyContent={"flex-start"}
            flexDirection={{ base: "column", md: "row" }}
          >
            <VStack
              w={{ base: "full", md: "40%" }}
              alignItems={"flex-start"}
              flexShrink={0}
              gap={3}
            >
              <Text as={"h3"}>
                Name:&nbsp;
                <strong>
                  {user.firstName} {user.lastName}
                </strong>
              </Text>

              <Text as={"h3"}>
                Date of Birth:&nbsp;
                <strong>{dayjs(user.dateOfBirth).format("ddd, MMM D")}</strong>
              </Text>

              <Text as={"h3"}>
                Account Type:&nbsp;<strong>{user.accountType}</strong>{" "}
              </Text>
            </VStack>

            <VStack
              flexShrink={0}
              alignItems={"flex-start"}
              gap={3}
              w={{ base: "full" }}
            >
              <Text as={"h3"}>
                {user.accountType == "staff" ? "Staff ID" : "Student ID"} No:
                &nbsp;
                <strong>{user.portalID}</strong>
              </Text>
              <Text as={"h3"}>
                Staff Role:&nbsp;<strong>{user.roles[0]}</strong>
              </Text>
              <Text>&nbsp;</Text>
            </VStack>
          </Flex>

          <Flex
            justifyContent={{ base: "center", md: "flex-end" }}
            w={"full"}
            flexDirection={{ base: "column", md: "row" }}
            mt={8}
            position={{ base: "relative", md: "absolute" }}
            bottom={0}
            gap={4}
          >
            <Button
              colorScheme="purple"
              variant={"outline"}
              leftIcon={<MdChangeCircle />}
              fontSize={"sm"}
              size={"sm"}
            >
              Change Password
            </Button>
            <Button
              colorScheme="blue"
              leftIcon={<MdShare />}
              fontSize={"sm"}
              size={"sm"}
            >
              Share Profile
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
