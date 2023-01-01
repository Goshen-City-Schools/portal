import React from "react";

import { Stack, Button } from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { AllStaffRolesTable } from "../../components/tables";

export default function StaffRolesConfigScreen() {
  const navigate = useNavigate();

  return (
    <Stack>
      <Button
        mb={4}
        ml={"auto"}
        size={"sm"}
        colorScheme={"blue"}
        leftIcon={<MdAdd />}
        onClick={() => navigate("/admin/staff/new")}
      >
        Add Staff Role
      </Button>

      <AllStaffRolesTable />
    </Stack>
  );
}
