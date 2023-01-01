import React from "react";

import { Stack } from "@chakra-ui/react";
import PortalTitle from "./shared/PortalTitle";
import BankAccountForm from "../components/forms/BankAccountForm";

export default function AddBankAccountPortal() {
  return (
    <Stack w={"full"}>
      <PortalTitle title={"Setup Bank Account"} />

      <BankAccountForm />
    </Stack>
  );
}
