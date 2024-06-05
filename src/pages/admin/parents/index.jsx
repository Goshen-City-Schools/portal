import React from "react";
import PageWrapper from "../../../components/PageWrapper";

import { Text, Flex, Box, Button } from "@chakra-ui/react";
import {
  MdAdd,
  MdIcecream,
  MdImportExport,
  MdUploadFile,
} from "react-icons/md";

import SearchWidget from "../../../widgets/Search.widget";
import AllParentsTable from "../../../components/tables/users/ParentsTable.component";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import PageSectionHeader from "../../../components/PageSectionHeader";
import { useNavigate } from "react-router-dom";
import { useGuardians } from "../../../hooks/Guardians";

export default function ParentsPage() {
  const navigate = useNavigate();

  const { guardiansData } = useGuardians();

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

        <Flex gap={4} fontSize={"sm"}>
          <Button
            size={"sm"}
            colorScheme={"blue"}
            variant={"outline"}
            leftIcon={<MdImportExport />}
            onClick={() => navigate("/admin/parents/new")}
          >
            Import / Export
          </Button>
          <Button
            size={"sm"}
            colorScheme={"blue"}
            leftIcon={<MdAdd />}
            onClick={() => navigate("/admin/parents/new")}
          >
            Add Guardian
          </Button>
        </Flex>
      </Flex>

      <Box p={4} bg={"white"} rounded={"md"}>
        {guardiansData && guardiansData?.length > 0 ? (
          <AllParentsTable existingParentsData={guardiansData} />
        ) : (
          <Text as={"h2"} letterSpacing={0.5} color={"neutral.700"}>
            No Guardian data yet!
          </Text>
        )}
      </Box>
    </PageWrapper>
  );
}
