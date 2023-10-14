import React from "react";
import SessionTerm from "../components/forms/SessionTerm.form";
import PageWrapper from "../components/PageWrapper";

export default function Home() {
  // const user = localStorage.getItem("user");
  return (
    <PageWrapper>
      <SessionTerm />
    </PageWrapper>
  );
}
