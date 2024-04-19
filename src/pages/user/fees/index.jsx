import React from "react";

import PageWrapper from "../../../components/PageWrapper";
import PageSectionHeader from "../../../components/PageSectionHeader";

import GenerateInvoice from "../../../components/forms/GenerateInvoice.form";

export default function FeesPage() {
  //   TODO: Set useStudentFee hook

  return (
    <PageWrapper>
      <PageSectionHeader
        pageTitle={`Fees Invoice`}
        pageCrumb={`Home / Fees / Generate Invoice`}
      />

      {/*  */}

      {/* Fee Detail Sheet */}

      <GenerateInvoice />
    </PageWrapper>
  );
}
