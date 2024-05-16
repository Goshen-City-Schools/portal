import React from "react";

import { Stack } from "@chakra-ui/react";
import PortalTitle from "../shared/PortalTitle";
import AddClassResultForm from "../../components/forms/AddClassResultForm";

function AddClassResultPortal() {
  return (
    <Stack w={"full"}>
      <PortalTitle title={"Add Class Result"} />

      <AddClassResultForm />
    </Stack>
  );
}

export default AddClassResultPortal;
