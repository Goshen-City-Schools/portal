import React from "react";

import { Stack } from "@chakra-ui/react";
import PortalTitle from "../shared/PortalTitle";

import AddStudentSubjectResultForm from "../../components/forms/results/AddStudentSubjectResult.form";

function AddStudentSubjectResultPortal() {
  return (
    <Stack w={"full"}>
      <PortalTitle title={"Add Subject Result"} />

      <AddStudentSubjectResultForm />
    </Stack>
  );
}

export default AddStudentSubjectResultPortal;
