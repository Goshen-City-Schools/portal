import React from "react";
import PageWrapper from "../../../components/PageWrapper";
import PageSectionHeader from "../../../components/PageSectionHeader";

import { Box } from "@chakra-ui/react";
import ReactPortal from "../../../widgets/React_portal";

import StaffForm from "../../../components/forms/StaffForm";
import { useStaffRoles } from "../../../hooks";

export default function NewStaffPage() {
  const { staffRolesData: staffRoles } = useStaffRoles();
  return (
    <PageWrapper>
      <ReactPortal />
      <PageSectionHeader
        pageTitle={"Create Staff Account"}
        pageCrumb={"Home / Staff / New"}
      />
      <Box w={"full"} mt={8} maxW={"2xl"} shadow={"sm"} mx={"auto"}>
        <StaffForm staffData={""} staffRoles={staffRoles} />
      </Box>
    </PageWrapper>
  );
}
