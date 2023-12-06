import React from "react";
import PageWrapper from "../../../components/PageWrapper";
import PageSectionHeader from "../../../components/PageSectionHeader";

export default function ParentPage() {
  return (
    <PageWrapper>
      <PageSectionHeader
        pageCrumb={"Home / Guardian"}
        pageTitle={"Guardian Profile"}
      />
    </PageWrapper>
  );
}
