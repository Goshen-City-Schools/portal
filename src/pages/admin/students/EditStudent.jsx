import React from "react";
import { useParams } from "react-router-dom";
import { useStudent } from "../../../hooks";

import { Box } from "@chakra-ui/react";

import PageWrapper from "../../../components/PageWrapper";
import PageSectionHeader from "../../../components/PageSectionHeader";
import StudentUpdateScreen from "../../../screens/StudentUpdateScreen";
import ThreeStepForm from "../../../components/FormStep";

export default function EditStudentPage() {
  const studentId = useParams();

  const { studentData } = useStudent(studentId);

  if (!studentData) return;

  const { firstName } = studentData;

  return (
    <PageWrapper>
      <PageSectionHeader
        pageTitle={`Student Profile Edit`}
        pageCrumb={`Home / Students / ${firstName} `}
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
        <ThreeStepForm studentData={studentData} />
      </Box>
    </PageWrapper>
  );
}
