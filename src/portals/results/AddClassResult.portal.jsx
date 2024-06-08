import React from "react";

import { Stack } from "@chakra-ui/react";
import PortalTitle from "../shared/PortalTitle";
import AddClassResultForm from "../../components/forms/AddClassResultForm";
import ResultForm from "../../components/forms/ResultForm";

function AddClassResultPortal() {
  return (
    <Stack w={"full"}>
      <PortalTitle title={"Add New Result"} />

      <ResultForm />
    </Stack>
  );
}

export default AddClassResultPortal;
