import React from "react";
import PageWrapper from "../../../../components/PageWrapper";
import PageSectionHeader from "../../../../components/PageSectionHeader";

import { Box } from "@chakra-ui/react";
import { AllStaffRolesTable } from "../../../../components/tables";

export default function StaffRolesPage() {
  return (
    <PageWrapper>
      <PageSectionHeader
        pageCrumb={"Home / Staff / Roles"}
        pageTitle={"Staff Roles"}
      />
      <Box px={6} mt={4} rounded={"lg"} py={4} bg={"white"}>
        <AllStaffRolesTable />
      </Box>{" "}
    </PageWrapper>
  );
}
