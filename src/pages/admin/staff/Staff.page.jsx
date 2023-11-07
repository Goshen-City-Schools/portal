import React from "react";
import PageWrapper from "../../../components/PageWrapper";
import PageSectionHeader from "../../../components/PageSectionHeader";
import StaffProfileScreen from "../../../screens/StaffProfileScreen";
import { useParams } from "react-router-dom";
import { useCallback } from "react";
import useStaff from "../../../hooks/useStaff";
import ProfileNotFoundScreen from "../../../screens/ProfileNotFoundScreen";

export default function StaffPage() {
  const { staffId } = useParams();
  const fetchStaff = useCallback(() => useStaff({ staffId: staffId }));
  const staff = fetchStaff();

  if (!staff) {
    return <ProfileNotFoundScreen />;
  }

  return (
    <PageWrapper>
      <PageSectionHeader
        pageTitle={"Staff Profile"}
        pageCrumb={`Home / Staff / ${staff?.firstName} `}
      />
      <StaffProfileScreen staff={staff} />
    </PageWrapper>
  );
}
