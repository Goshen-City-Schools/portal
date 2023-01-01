import React from "react";

import { Button, Box } from "@chakra-ui/react";
import { useModal } from "../../app/contexts/ModalContext";
import { CreateTuitionFee } from "../../portals";
import { TuitionFeeTable } from "../../components/tables";

export default function TuitionFeeConfigScreen() {
  const { openPortal } = useModal();

  return (
    <Box>
      <Button
        size={"sm"}
        colorScheme="blue"
        variant={"outline"}
        onClick={() => {
          openPortal(<CreateTuitionFee />);
        }}
      >
        Add Tuition Fee
      </Button>

      <TuitionFeeTable />
    </Box>
  );
}
