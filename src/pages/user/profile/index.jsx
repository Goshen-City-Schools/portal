import React from "react";
import PageWrapper from "../../../components/PageWrapper";
import PageSectionHeader from "../../../components/PageSectionHeader";
import ProfileScreen from "../../../screens/ProfileScreen";
import { useUser } from "../../../app/contexts/UserContext";

export default function MyProfilePage() {
  const { user } = useUser();
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
