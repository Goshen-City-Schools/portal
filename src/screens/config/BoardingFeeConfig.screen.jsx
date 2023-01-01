import React from "react";

import { Button, Box } from "@chakra-ui/react";
import { useModal } from "../../app/contexts/ModalContext";
import { CreateBoardingsFee } from "../../portals";
import { BoardingFeeTable } from "../../components/tables";

export default function BoardingFeeConfigScreen() {
  const { openPortal } = useModal();

  return (
    <Box>
      <Button
        size={"sm"}
        colorScheme="blue"
        variant={"outline"}
        onClick={() => {
          openPortal(<CreateBoardingsFee />);
        }}
      >
        Add Boarding Fee
      </Button>

      <BoardingFeeTable />
    </Box>
  );
}
