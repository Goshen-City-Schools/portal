import React from "react";
import PageWrapper from "../../../../components/PageWrapper";
import PageSectionHeader from "../../../../components/PageSectionHeader";

import { Text, Flex, Box, Button } from "@chakra-ui/react";

import { MdAdd, MdIcecream, MdUploadFile } from "react-icons/md";
import IconComponent from "../../../../components/Icon.component";

import { SubjectTeacherCBTClasslist } from "../../../../components/tables";

export default function ExamHomePage() {
  return (
    <PageWrapper>
      <PageSectionHeader
        pageTitle={"CBT (Exams)"}
        pageCrumb={"Home / CBT / Examinations"}
      />

      <Box>
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          mt={8}
          mb={6}
        >
          <div></div>

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
              Set Questions
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
              Bulk Upload Questions
            </Button>
            <Button
              bg={"brand.700"}
              size={"sm"}
              color={"neutral.100"}
              onClick={() => openPortal(<CreateStudentPortal />)}
            >
              <IconComponent>
                <MdAdd />
              </IconComponent>
              Download Format
            </Button>
          </Flex>
        </Flex>

        <Text as="h2">All Exam Questions you've set appears here!</Text>

        <SubjectTeacherCBTClasslist />
      </Box>
    </PageWrapper>
  );
}
