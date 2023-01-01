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
        <StaffForm staffData={""} staffRoles={staffRoles} />
      </Box>
    </PageWrapper>
  );
}
