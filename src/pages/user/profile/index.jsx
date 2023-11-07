import React from "react";
import PageWrapper from "../../../components/PageWrapper";
import PageSectionHeader from "../../../components/PageSectionHeader";
import ProfileScreen from "../../../screens/ProfileScreen";

export default function MyProfilePage() {
  const user = {
    name: "Paul Ishaili",
  };
  return (
    <PageWrapper>
      <PageSectionHeader
        pageTitle={"My Profile"}
        pageCrumb={"Home / My Profile"}
      />

      <ProfileScreen user={user} />
    </PageWrapper>
  );
}
