import React from "react";
import { useNavigate } from "react-router-dom";

import { Stack, Button } from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";
import { SubjectTable } from "../../components/tables";

export default function SubjectsConfigScreen() {
  const navigate = useNavigate();
  return (
    <Stack>
      <Button
        mb={4}
        ml={"auto"}
        size={"sm"}
        colorScheme={"facebook"}
        leftIcon={<MdAdd />}
        onClick={() => navigate("/admin/config/subjects/new")}
      >
        Add Subject
      </Button>

      <SubjectTable />
    </Stack>
  );
}
