import React from "react";
import PageWrapper from "../../../components/PageWrapper";

import { Flex, Box, Button, Text } from "@chakra-ui/react";

import { MdAdd, MdIcecream, MdUploadFile } from "react-icons/md";

import AllStudentsTable from "../../../components/tables/AllStudentsTable.component";
import SearchWidget from "../../../widgets/Search.widget";
import IconComponent from "../../../components/Icon.component";

import PageSectionHeader from "../../../components/PageSectionHeader";
import { useNavigate } from "react-router-dom";

export default function StudentsPage() {
  const navigate = useNavigate();
  const existingStudentsData = localStorage.getItem("studentsData") || [];

  return (
    <PageWrapper>
      <PageSectionHeader
        pageTitle={"All Students"}
        pageCrumb={"Home / Students / All Students"}
      />

      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        mt={8}
        mb={6}
      >
        <SearchWidget height={10} text={"Search Students"} />

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
          <Button
            bg={"brand.700"}
            size={"sm"}
            color={"neutral.100"}
            onClick={() => navigate("/admin/students/new")}
          >
            <IconComponent>
              <MdAdd />
            </IconComponent>
            New Student
          </Button>
        </Flex>
      </Flex>

      <Box p={4} bg={"white"} rounded={"md"}>
        {existingStudentsData.length > 0 ? (
          <AllStudentsTable />
        ) : (
          <Text as={"h2"} letterSpacing={0.5} color={"neutral.700"}>
            No students data yet!
          </Text>
        )}
      </Box>
    </PageWrapper>
  );
}
