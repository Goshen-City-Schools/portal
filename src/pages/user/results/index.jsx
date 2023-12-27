import React from "react";
import PageWrapper from "../../../components/PageWrapper";
import PageSectionHeader from "../../../components/PageSectionHeader";

import { Box } from "@chakra-ui/react";
import StudentUserResultTable from "../../../components/tables/results/StudentUserResult.table";

export default function MyResultsPage() {
  const resultsData = [
    {
      session: "20232024",
      class: "term1",
      term: "term1",
    },
  ];

  return (
    <PageWrapper>
      <PageSectionHeader
        pageTitle={`My Results`}
        pageCrumb={"Home / My Results"}
      />

      <Box>
        <StudentUserResultTable data={resultsData} />
      </Box>
    </PageWrapper>
  );
}
