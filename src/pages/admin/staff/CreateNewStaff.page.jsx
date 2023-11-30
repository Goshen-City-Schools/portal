import React from "react";
import PageWrapper from "../../../components/PageWrapper";
import PageSectionHeader from "../../../components/PageSectionHeader";

import { Box } from "@chakra-ui/react";
import schoolData from "../../../data/school.data";
import ReactPortal from "../../../widgets/React_portal";

import StaffForm from "../../../components/forms/StaffForm";

export default function CreateNewStaff() {
  return (
    <PageWrapper>
      <ReactPortal />
      <PageSectionHeader
        pageTitle={"Create Staff Account"}
        pageCrumb={"Home / Staff / New"}
      />
      <Box w={"full"} mt={8} maxW={"2xl"} shadow={"sm"} mx={"auto"}>
        <StaffForm staffData={""} schoolData={schoolData} />
      </Box>
    </PageWrapper>
  );
}
