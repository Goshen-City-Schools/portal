import React from "react";

import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { MdArrowBack } from "react-icons/md";
import PageWrapper from "../components/PageWrapper";
import { useNavigate } from "react-router-dom";

export default function ProfileNotFoundScreen() {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page in the history
  };
  return (
    <PageWrapper>
      <Flex
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={4}
        bg={"white"}
        px={6}
        py={4}
        height={"full"}
        minH={"70vh"}
      >
        <Text as={"h2"}>Profile Not Found ...</Text>

        <Button onClick={handleGoBack} leftIcon={<MdArrowBack />}>
          Go Back
        </Button>
      </Flex>
    </PageWrapper>
  );
}
