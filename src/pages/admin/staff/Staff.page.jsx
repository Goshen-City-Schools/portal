import React from "react";
import PageWrapper from "../../../components/PageWrapper";
import PageSectionHeader from "../../../components/PageSectionHeader";
import StaffProfileScreen from "../../../screens/StaffProfileScreen";
import { useParams } from "react-router-dom";
import ProfileNotFoundScreen from "../../../screens/ProfileNotFoundScreen";
import ReactPortal from "../../../widgets/React_portal";
import { useAuth } from "../../../app/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { getSingleStaff, getStaffData } from "../../../api/staff.api";
import { useState } from "react";
import { useEffect } from "react";

export default function StaffPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { staffId } = useParams();
  const [staff, setStaff] = useState();

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const response = await getSingleStaff(staffId);
        setStaff(response);
      } catch (error) {
        console.error("Error fetching staff:", error.message);
        // Handle the error, e.g., set an error state
      }
    };

    fetchStaffData(); // Call the async function
  }, [staffId]); // Include staffId in the dependency array

  const existingStaffData = async () => await getStaffData();

  if (!staff) {
    return <ProfileNotFoundScreen />;
  }

  // Check if the student being viewed is the logged-in user
  if (user && staffId === user.username) {
    // Navigate to the "My Profile" screen
    return navigate("/admin/profile");
  }

  return (
    <PageWrapper>
      <ReactPortal />
      <PageSectionHeader
        pageTitle={`Staff Profile - ${staff?.name}`}
        pageCrumb={`Home / Staff / ${staff?.name} `}
      />

      <StaffProfileScreen
        existingStaffData={existingStaffData}
        staff={staff}
        staffId={staff.username}
      />
    </PageWrapper>
  );
}
