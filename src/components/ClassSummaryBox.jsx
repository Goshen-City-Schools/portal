import React from "react";
import { Box, Text, Flex, Image } from "@chakra-ui/react";
import StatCardComponent from "./StatCard.component";

const ClassSummaryBox = ({
  totalStudents,
  maleStudents,
  femaleStudents,
  classTeacher,
}) => {
  return (
    <Flex gap={4} my={4} mt={8} overflowX={"scroll"} pb={{ base: 10, md: 6 }}>
      <StatCardComponent
        color={"#F5DDFF"}
        imgSrc={"people.png"}
        text={"Total students:"}
        number={totalStudents}
        maxW={"280px"}
      />

      <StatCardComponent
        color={"#F5DDFF"}
        imgSrc={"male-student.png"}
        text={"Total Male"}
        number={maleStudents}
        maxW={"280px"}
      />

      <StatCardComponent
        color={"#F5DDFF"}
        imgSrc={"people.png"}
        text={"Total Female:"}
        number={femaleStudents}
        maxW={"280px"}
      />
      <Flex
        border={"1px solid"}
        borderColor={"brand.700"}
        px={4}
        py={3}
        rounded={"lg"}
        gap={4}
        alignItems={"center"}
        mt={2}
        w={"full"}
        flexShrink={0}
        maxW={"320px"}
      >
        <Image
          bg={"whiteAlpha.300"}
          h={9}
          w={9}
          rounded={"full"}
          objectFit={"cover"}
          src="/avatar.png"
        />
        <Box>
          <Text fontWeight={"bold"} fontSize={"lg"} as={"h3"}>
            {classTeacher}
          </Text>
          <Text as={"small"} fontSize={"xs"}>
            Class Teacher
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default ClassSummaryBox;
