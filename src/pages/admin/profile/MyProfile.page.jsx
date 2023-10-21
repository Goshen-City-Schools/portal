import React from "react";
import PageWrapper from "../../../components/PageWrapper";
import PageSectionHeader from "../../../components/PageSectionHeader";

export default function MyProfilePage() {
  return (
    <PageWrapper>
      <PageSectionHeader
        pageTitle={"My Profile"}
        pageCrumb={"Home / My Profile"}
      />
      <div>MyProfilePage</div>;
    </PageWrapper>
  );
}
