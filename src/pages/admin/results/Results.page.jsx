import React from "react";
import PageWrapper from "../../../components/PageWrapper";
import ResultSheet from "../../../components/ResultSheet";

import { Text } from "@chakra-ui/react";

export default function ResultPage() {
  return (
    <PageWrapper overflowX={"scroll"}>
      <ResultSheet />
    </PageWrapper>
  );
}
