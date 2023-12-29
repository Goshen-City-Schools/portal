import React from "react";
import { useNavigate } from "react-router-dom";

import { Stack, Button } from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";
import { AllBankAccountsTable } from "../../components/tables";
import { useModal } from "../../app/contexts/ModalContext";
import AddBankAccountPortal from "../../portals/AddBankAccount.portal";

export default function BankAccountsConfigScreen() {
  const { openPortal } = useModal();
  return (
    <Stack>
      <Button
        mb={4}
        ml={"auto"}
        size={"sm"}
        colorScheme={"blue"}
        leftIcon={<MdAdd />}
        onClick={() => openPortal(<AddBankAccountPortal />)}
      >
        Add Bank Account
      </Button>

      <AllBankAccountsTable />
    </Stack>
  );
}
