import React from "react";
import { useNavigate } from "react-router-dom";

import { Stack, Button } from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";
import { AllClassesTable } from "../../components/tables";
import { useClasses, useStudents } from "../../hooks";
import { useModal } from "../../app/contexts/ModalContext";
import { CreateSubClassPortal } from "../../portals";

export default function ClassConfigScreen() {
  const { schoolClasses } = useClasses();

  const { studentsData } = useStudents();

  const navigate = useNavigate();
  const { openPortal } = useModal();
  return (
    <Stack>
      <Button
        mb={4}
        ml={"auto"}
        size={"sm"}
        colorScheme={"facebook"}
        leftIcon={<MdAdd />}
        onClick={() => openPortal(<CreateSubClassPortal />)}
      >
        Add SubClass
      </Button>

      <AllClassesTable data={schoolClasses} studentsData={studentsData} />
    </Stack>
  );
}
