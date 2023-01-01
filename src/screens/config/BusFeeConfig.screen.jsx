import React from "react";

import { Button, Box } from "@chakra-ui/react";
import { useModal } from "../../app/contexts/ModalContext";
import { CreateBusFee } from "../../portals";
import { BusFeeTable } from "../../components/tables";

export default function BusFeeConfigScreen() {
  const { openPortal } = useModal();

  return (
    <Box>
      <Button
        size={"sm"}
        colorScheme="blue"
        variant={"outline"}
        onClick={() => {
          openPortal(<CreateBusFee />);
        }}
      >
        Add Bus Fee
      </Button>

      <BusFeeTable />
    </Box>
  );
}
