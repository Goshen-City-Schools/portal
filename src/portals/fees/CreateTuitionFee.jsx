import React from "react";

import { Text, Stack } from "@chakra-ui/react";
import TuitionFeeForm from "../../components/forms/fees/TuitionFeeForm";
import PortalTitle from "../shared/PortalTitle";

export default function CreateTuitionFee({ action, fees, existingData }) {
  return (
    <Stack w={"full"}>
      <PortalTitle title={"Tuition Fee Setup"} />

      <TuitionFeeForm fees={fees} action={action} existingData={existingData} />
    </Stack>
  );
}
