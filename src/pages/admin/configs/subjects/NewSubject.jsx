import React from "react";
import PageWrapper from "../../../../components/PageWrapper";
import PageSectionHeader from "../../../../components/PageSectionHeader";
import SubjectForm from "../../../../components/forms/SubjectForm";

import { Box } from "@chakra-ui/react";

export default function NewSubjectPage() {
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
        <SubjectForm />
      </Box>
    </PageWrapper>
  );
}
