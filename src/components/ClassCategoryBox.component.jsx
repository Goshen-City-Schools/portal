import React from "react";
import { Box, Image, Text, Flex, IconButton } from "@chakra-ui/react";
// import { ChevronRightIcon } from "@chakra-ui/icons";
import { FaChevronRight } from "react-icons/fa";

const ClassCategoryBox = ({
  category,
  illustration,
  studentCount,
  onClick,
}) => {
  return (
    <Box
      flexShrink={"0"}
      w={"full"}
      maxWidth={"280px"}
      border="1px"
      borderColor="gray.300"
      borderRadius="md"
      p={4}
      cursor="pointer"
      _hover={{ borderColor: "blue.500" }}
      onClick={onClick}
    >
      <Image
        src={illustration}
        alt={category}
        height={10}
        width={10}
        objectFit={"cover"}
        rounded={"full"}
      />
      <Text mt={2} fontSize="lg" fontWeight="bold">
        {category}
      </Text>
      <Text mt={2} color="gray.500">
        {studentCount} Students
      </Text>
      <Flex justify="flex-end" mt={2}>
        <IconButton
          icon={<FaChevronRight />}
          size="sm"
          variant="ghost"
          onClick={onClick}
        />
      </Flex>
    </Box>
  );
};

export default ClassCategoryBox;
