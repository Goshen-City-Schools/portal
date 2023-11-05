import React from "react";
import PageWrapper from "../../../components/PageWrapper";

import { Text, Flex, Box, Button } from "@chakra-ui/react";
import { MdAdd, MdIcecream, MdUploadFile } from "react-icons/md";

import SearchWidget from "../../../widgets/Search.widget";
import IconComponent from "../../../components/Icon.component";
import AllParentsTable from "../../../components/tables/AllParentsTable.component";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
// import AllParentTable from "../../../components/tables/AllStaffTable.component";

export default function ParentPage() {
  const { getItem } = useLocalStorage("studentsData");

  const existingParentsData = getItem();
  return (
    <PageWrapper>
      <Flex justifyContent={"space-between"} alignItems={"center"} mb={2}>
        <Text
          as={"h2"}
          mt={0}
          className=""
          fontSize={"2xl"}
          fontWeight={"bold"}
        >
          All Parents
        </Text>
        <Text as={"small"}>Home / Parent / All Parent</Text>
      </Flex>

      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        mt={8}
        mb={6}
      >
        <SearchWidget height={10} text={"Search Parent"} />

        <Flex gap={4} fontSize={"sm"}>
          <Button
            size={"sm"}
            bg={"neutral.100"}
            border={"1px"}
            borderColor={"brand.700"}
          >
            <IconComponent>
              <MdIcecream />
            </IconComponent>{" "}
            Download
          </Button>
          <Button
            as={"Flex"}
            gap={2}
            size={"sm"}
            bg={"accent.700"}
            color={"white"}
          >
            <IconComponent>
              <MdUploadFile />
            </IconComponent>{" "}
            Bulk Upload Students
          </Button>
          <Button bg={"brand.700"} size={"sm"} color={"neutral.100"}>
            <IconComponent>
              <MdAdd />
            </IconComponent>
            New Student
          </Button>
        </Flex>
      </Flex>

      <Box p={4} bg={"white"} rounded={"md"}>
        {existingParentsData && existingParentsData?.length > 0 ? (
          <AllParentsTable />
        ) : (
          <Text as={"h2"} letterSpacing={0.5} color={"neutral.700"}>
            No Parents data yet!
          </Text>
        )}
      </Box>
    </PageWrapper>
  );
}
