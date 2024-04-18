import React from "react";
import FeesConfigScreen from "../../../../screens/config/FeesConfig.screen";
import PageWrapper from "../../../../components/PageWrapper";
import PageSectionHeader from "../../../../components/PageSectionHeader";

import { Box } from "@chakra-ui/react";

function FeespPage() {
  return (
    <PageWrapper>
      <PageSectionHeader
        pageTitle={"Fees"}
        pageCrumb={"Home / Finance / Fees"}
      />

      <Box py={6} px={4} bg={"white"} rounded={"md"}>
        <FeesConfigScreen />
      </Box>
    </PageWrapper>
  );
}

export default FeespPage;
