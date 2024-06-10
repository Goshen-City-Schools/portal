import React from "react";

import { Stack } from "@chakra-ui/react";
import PortalTitle from "./PortalTitle";
import ResultForm from "../../components/forms/BulkResultForm";

export default function AddResultPortal() {
  return (
    <Stack w={"full"}>
      <PortalTitle title={"New Result"} />

      <ResultForm />
    </Stack>
  );
}
