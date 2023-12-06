import React from "react";
import SessionTerm from "../../components/forms/SessionTerm.form";
import PageWrapper from "../../components/PageWrapper";
import PageSectionHeader from "../../components/PageSectionHeader";

export default function Home() {
  // const user = localStorage.getItem("user");
  return (
    <PageWrapper>
      <PageSectionHeader pageCrumb={"Home"} pageTitle={"Overview"} />

      <SessionTerm />
    </PageWrapper>
  );
}
