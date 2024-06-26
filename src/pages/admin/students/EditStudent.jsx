import React from "react";
import { useParams } from "react-router-dom";
import { useStudent } from "../../../hooks";

import { Box } from "@chakra-ui/react";

import PageWrapper from "../../../components/PageWrapper";
import PageSectionHeader from "../../../components/PageSectionHeader";
import StudentForm from "../../../components/forms/StudentForm";

export default function EditStudentPage() {
  const studentId = useParams();

  const { studentData } = useStudent(studentId);

  if (!studentData) return;

  const { first_name } = studentData;

  return (
    <PageWrapper>
      <PageSectionHeader
        pageTitle={`Student Profile Edit`}
        pageCrumb={`Home / Students / ${first_name} `}
      />

      <Box
        bg={"white"}
        paddingX={8}
        paddingY={4}
        width={"full"}
        maxW={"2xl"}
        rounded={"lg"}
        my={8}
        mx={"auto"}
      >
        <StudentForm action={"edit"} studentData={studentData} />
      </Box>
    </PageWrapper>
  );
}
