import React from "react";
import PageWrapper from "../../../components/PageWrapper";

import { Text, Flex, Box, Button } from "@chakra-ui/react";
import { MdAdd, MdIcecream, MdUploadFile } from "react-icons/md";

import AllStudentsTable from "../../../components/tables/AllStudentsTable.component";
import SearchWidget from "../../../widgets/Search.widget";
import IconComponent from "../../../components/Icon.component";
import HorizontalScrollableTabs from "../../../widgets/HorizontalScrollableTabs.widget";
import { useState } from "react";
import ClassSummaryBox from "../../../components/ClassSummaryBox";

export default function ClassPage() {
  const [activeTab, setActiveTab] = useState(1);

  const tabs = [
    { id: 1, label: "Students (25)" },
    { id: 2, label: "Subjects" },
    { id: 3, label: "Time table" },
    { id: 4, label: "Attendance" },
    { id: 5, label: "Social Behaviour" },
    { id: 6, label: "Broadsheet" },
    // Add more tabs as needed
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

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
          Senior Secondary School (SSS 1A)
        </Text>
        <Text as={"small"}>Home / Classes / SSS 1A</Text>
      </Flex>

      <ClassSummaryBox
        totalStudents={"40"}
        maleStudents={"24"}
        femaleStudents={"18"}
        classTeacher={"Nwa Oriaku"}
      />

      <HorizontalScrollableTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabClick={handleTabClick}
      />

      <>
        {" "}
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          mt={8}
          mb={6}
        >
          <SearchWidget height={10} text={"Search students"} />

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
          <AllStudentsTable />
        </Box>
      </>
    </PageWrapper>
  );
}
