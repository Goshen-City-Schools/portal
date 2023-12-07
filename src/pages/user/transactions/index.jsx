import React from "react";
import PageWrapper from "../../../components/PageWrapper";
import PageSectionHeader from "../../../components/PageSectionHeader";

import StudentTransactionsTable from "../../../components/tables/payments/StudentTransactionsTable";

export default function TransactionsPage() {
  return (
    <PageWrapper>
      <PageSectionHeader
        pageCrumb={"Home / Transactions"}
        pageTitle={"My Transactions"}
      />

      <StudentTransactionsTable />
    </PageWrapper>
  );
}
