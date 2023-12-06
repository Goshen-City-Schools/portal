import React from "react";
import SubjectForm from "../components/forms/SubjectForm";

import { Stack, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useSubject } from "../hooks/Subjects";
import PortalTitle from "./shared/PortalTitle";

export default function AddSubjectPortal() {
  const { subjectId } = useParams();

  const { subjectData } = useSubject(subjectId);

  console.log(subjectId, subjectData);

  return (
    <Stack w={"full"}>
      <PortalTitle title={"Add Subject"} />

      <SubjectForm subjectData={subjectData} />
    </Stack>
  );
}
