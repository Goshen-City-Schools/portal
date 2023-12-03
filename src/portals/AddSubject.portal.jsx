import React from "react";
import SubjectForm from "../components/forms/SubjectForm";

import { Stack, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useSubject } from "../hooks/Subjects";

export default function AddSubjectPortal() {
  const { subjectId } = useParams();

  const { subjectData } = useSubject(subjectId);

  console.log(subjectId, subjectData);

  return (
    <Stack w={"full"}>
      <Text as={"h3"} fontSize={"2xl"} fontWeight={"bold"} textAlign={"center"}>
        Add Subject
      </Text>
      <SubjectForm subjectData={subjectData} />
    </Stack>
  );
}
