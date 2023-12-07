import React from "react";
import PageWrapper from "../../../components/PageWrapper";
import PageSectionHeader from "../../../components/PageSectionHeader";
import { useParams } from "react-router-dom";
import { useTransaction } from "../../../hooks";

import { GeneralNotFound } from "../../shared";

import { Box } from "@chakra-ui/react";

export default function TransactionPage() {
  const { transactionId } = useParams;

  const { transactionData } = useTransaction(transactionId);

  if (!transactionData) return <GeneralNotFound />;

  //   Transaction page is invoice page with status paid or not paid.

  return (
    <PageWrapper>
      <PageSectionHeader
        pageCrumb={"My Trasactions"}
        pageTitle={"Home / Transactions"}
      />

      <Box>
        <Text>Transactional</Text>
      </Box>
    </PageWrapper>
  );
}
