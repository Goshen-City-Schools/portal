import React from "react";
import { useNavigate } from "react-router-dom";

import { Stack, Button } from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";
import { AllBankAccountsTable } from "../../components/tables";

export default function BankAccountsConfigScreen() {
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
        Add Bank Account
      </Button>

      <AllBankAccountsTable />
    </Stack>
  );
}
