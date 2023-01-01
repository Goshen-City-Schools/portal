import React from "react";
import PageWrapper from "../../../components/PageWrapper";
import PageSectionHeader from "../../../components/PageSectionHeader";

import { Box } from "@chakra-ui/react";

export default function WritePage() {
  return (
    <PageWrapper>
      <PageSectionHeader pageCrumb={"Write"} pageTitle={"Home / Write"} />

      <Box>{/* Show Data stat of audience responding to writings */}</Box>
    </PageWrapper>
  );
}
