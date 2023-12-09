import React from "react";
import { useParams } from "react-router-dom";
import { useStaff } from "../../../hooks";

import { Box } from "@chakra-ui/react";

import PageWrapper from "../../../components/PageWrapper";
import PageSectionHeader from "../../../components/PageSectionHeader";
import StudentForm from "../../../components/forms/StudentForm";
import StaffForm from "../../../components/forms/StaffForm";

export default function EditStaffPage() {
  const { staffId } = useParams();

  const { staffData } = useStaff(staffId);

  console.log(staffData);

  const { firstName } = staffData;

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
        <StaffForm action={"edit"} staffData={staffData} />
      </Box>
    </PageWrapper>
  );
}
