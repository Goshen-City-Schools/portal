import React from "react";
import PageWrapper from "../../../components/PageWrapper";
import PageSectionHeader from "../../../components/PageSectionHeader";

import { Box } from "@chakra-ui/react";
import GuardianForm from "../../../components/forms/GuardianForm";

export default function NewParentPage() {
  return (
    <PageWrapper>
      <PageSectionHeader
        pageCrumb={"Home / Parents / New"}
        pageTitle={"New Parent Account"}
      />

      <Box w={"full"} mt={8} maxW={"2xl"} shadow={"sm"} mx={"auto"}>
        <GuardianForm guardianData={""} />
      </Box>
    </PageWrapper>
  );
}
