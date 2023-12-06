import React from "react";
import PageWrapper from "../../../components/PageWrapper";

import { Text, Flex, Box, Button } from "@chakra-ui/react";
import { MdAdd, MdIcecream, MdUploadFile } from "react-icons/md";

import SearchWidget from "../../../widgets/Search.widget";
import IconComponent from "../../../components/Icon.component";
import AllParentsTable from "../../../components/tables/users/ParentsTable.component";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import PageSectionHeader from "../../../components/PageSectionHeader";

export default function ParentsPage() {
  const { getItem } = useLocalStorage("studentsData");

  const existingParentsData = getItem();
  return (
    <PageWrapper>
      <PageSectionHeader
        pageCrumb={"Home / Parents"}
        pageTitle={"All Parents"}
      />

      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        mt={8}
        mb={6}
      >
        <SearchWidget height={10} text={"Search Parent"} />

        <Button bg={"brand.700"} size={"sm"} color={"neutral.100"}>
          <IconComponent>
            <MdAdd />
          </IconComponent>
          New Guardian
        </Button>
      </Flex>

      <Box p={4} bg={"white"} rounded={"md"}>
        {existingParentsData && existingParentsData?.length > 0 ? (
          <AllParentsTable />
        ) : (
          <Text as={"h2"} letterSpacing={0.5} color={"neutral.700"}>
            No Guardian data yet!
          </Text>
        )}
      </Box>
    </PageWrapper>
  );
}
