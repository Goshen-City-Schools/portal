import React from "react";
import PageWrapper from "../../../../components/PageWrapper";
import PageSectionHeader from "../../../../components/PageSectionHeader";

import { Text, Box } from "@chakra-ui/react";
import AllStaffRolesTable from "../../../../components/tables/AllStaffRolesTable.component";

export default function StaffRoles() {
  return (
    <PageWrapper>
      <PageSectionHeader
        pageCrumb={"Home / Staff / Roles"}
        pageTitle={"Staff Roles"}
      />
      <Text as={"h3"}>Manage Staff Roles</Text>
      <Box px={6} mt={4} rounded={"lg"} py={4} bg={"white"}>
        <AllStaffRolesTable />
      </Box>{" "}
    </PageWrapper>
  );
}
