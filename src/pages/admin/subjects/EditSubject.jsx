import React from "react";
import { useSubject, useSubjects } from "../../../hooks/Subjects";
import { useParams } from "react-router-dom";
import { useClasses } from "../../../hooks";
import PageWrapper from "../../../components/PageWrapper";
import PageSectionHeader from "../../../components/PageSectionHeader";
import SubjectForm from "../../../components/forms/SubjectForm";

import { Box } from "@chakra-ui/react";

export default function EditSubject() {
  const { subjectsData } = useSubjects();
  const { schoolClasses } = useClasses();
  const { subjectId } = useParams();
  const { subjectData } = useSubject(subjectId);

  if (!subjectData) return;

  const { name, classes: initialClasses } = subjectData || {};

  return (
    <PageWrapper>
      <PageSectionHeader
        pageTitle={`Subject Data Edit`}
        pageCrumb={`Home / Subject / ${name} `}
      />

      <Box
        bg={"white"}
        paddingX={8}
        paddingY={4}
        width={"full"}
        maxW={"2xl"}
        rounded={"lg"}
        my={8}
        mx={"auto"}
      >
        <SubjectForm action={"edit"} subjectData={subjectData} />
      </Box>
    </PageWrapper>
  );
}
