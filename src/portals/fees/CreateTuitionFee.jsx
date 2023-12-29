import React from "react";

import { Text, Stack } from "@chakra-ui/react";
import TuitionFeeForm from "../../components/forms/fees/TuitionFeeForm";
import PortalTitle from "../shared/PortalTitle";

export default function CreateTuitionFee({ action, feeTypeId }) {
  return (
    <Stack w={"full"}>
      <PortalTitle title={"Tuition Fee Setup"} />

      <TuitionFeeForm action={action} feeTypeId={feeTypeId} />
    </Stack>
  );
}
