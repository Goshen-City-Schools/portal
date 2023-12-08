import React from "react";
import PageWrapper from "../../../../components/PageWrapper";
import PageSectionHeader from "../../../../components/PageSectionHeader";

import { Box, Button } from "@chakra-ui/react";
import { AllStaffRolesTable } from "../../../../components/tables";
import { MdAdd } from "react-icons/md";
import { useModal } from "../../../../app/contexts/ModalContext";

export default function StaffRolesPage() {
  const { openPortal } = useModal;

  return (
    <PageWrapper>
      <PageSectionHeader
        pageCrumb={"Home / Staff / Roles"}
        pageTitle={"Staff Roles"}
      />
      <Box mt={4} rounded={"lg"} py={4}>
        <Button
          display={"flex"}
          ml={"auto"}
          size={"sm"}
          colorScheme={"blue"}
          leftIcon={<MdAdd />}
          onClick={() => navigate("/admin/staff/new")}
        >
          Add New Role
        </Button>
        <AllStaffRolesTable />
      </Box>{" "}
    </PageWrapper>
  );
}
