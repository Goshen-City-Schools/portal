import React from "react";
import PageWrapper from "../../components/PageWrapper";
import PageSectionHeader from "../../components/PageSectionHeader";
import { useUser } from "../../app/contexts/UserContext";

export default function UserHome() {
  const { user } = useUser();
  return (
    <PageWrapper>
      <PageSectionHeader
        pageCrumb={"Home"}
        pageTitle={`Welcome ${user.first_name}`}
      />
    </PageWrapper>
  );
}
