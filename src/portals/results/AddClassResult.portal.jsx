import React from "react";

import { Stack } from "@chakra-ui/react";
import PortalTitle from "../shared/PortalTitle";
import BulkResultForm from "../../components/forms/BulkResultForm";

function AddClassResultPortal() {
  return (
    <Stack w={"full"}>
      <PortalTitle title={"Add New Result"} />

      <BulkResultForm />
    </Stack>
  );
}

export default AddClassResultPortal;
