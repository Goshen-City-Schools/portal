import React from "react";
import { useNavigate } from "react-router-dom";

import { Stack, Button } from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";
import { AllClassesTable } from "../../components/tables";

export default function ClassConfigScreen() {
  const navigate = useNavigate();
  return (
    <Stack>
      <Button
        mb={4}
        ml={"auto"}
        size={"sm"}
        colorScheme={"blue"}
        leftIcon={<MdAdd />}
        onClick={() => navigate("/admin/students/new")}
      >
        Add SubClass
      </Button>

      <AllClassesTable />
    </Stack>
  );
}
