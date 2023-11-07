import React from "react";
import PageWrapper from "../../../components/PageWrapper";
import PageSectionHeader from "../../../components/PageSectionHeader";

export default function StaffPage() {
  const staff = {
    name: "NwaOriaku",
  };
  return (
    <PageWrapper>
      <PageSectionHeader
        pageTitle={"Staff Profile"}
        pageCrumb={`Home / Staff / ${staff?.name} `}
      />
      <div>{staff.name}</div>
    </PageWrapper>
  );
}
