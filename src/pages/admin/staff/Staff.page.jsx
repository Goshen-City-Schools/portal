import React from "react";
import PageWrapper from "../../../components/PageWrapper";
import PageSectionHeader from "../../../components/PageSectionHeader";
import StaffProfileScreen from "../../../screens/StaffProfileScreen";
import { useParams } from "react-router-dom";
import { useCallback } from "react";
import useStaff from "../../../hooks/useStaff";
import ProfileNotFoundScreen from "../../../screens/ProfileNotFoundScreen";
import ReactPortal from "../../../widgets/ReactPortal";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useUser } from "../../../app/contexts/UserContext";
import { useNavigate } from "react-router-dom";

export default function StaffPage() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { staffId } = useParams();
  const fetchStaff = useCallback(() =>
    useStaff({ staffId: staffId.toLocaleLowerCase() })
  );
  const staff = fetchStaff();
  const { getItem } = useLocalStorage("staffData");
  const existingStaffData = getItem();

  if (!staff) {
    return <ProfileNotFoundScreen />;
  }

  // Check if the student being viewed is the logged-in user
  if (user && staffId === user.id) {
    // Navigate to the "My Profile" screen
    return navigate("/admin/profile");
  }

  return (
    <PageWrapper>
      <ReactPortal />
      <PageSectionHeader
        pageTitle={"Staff Profile"}
        pageCrumb={`Home / Staff / ${staff?.firstName} `}
      />
      <StaffProfileScreen
        existingStaffData={existingStaffData}
        staff={staff}
        staffId={staff.id}
      />
    </PageWrapper>
  );
}
