import React from "react";
import PageWrapper from "../../../components/PageWrapper";
import PageSectionHeader from "../../../components/PageSectionHeader";
import useStudent from "../../../hooks/useStudent";
import { useCallback } from "react";
import { useParams } from "react-router-dom";
import StudentProfileScreen from "../../../screens/StudentProfileScreen";
import ProfileNotFoundScreen from "../../../screens/ProfileNotFoundScreen";
import { useUser } from "../../../app/contexts/UserContext";
import { useNavigate } from "react-router-dom";

export default function StudentPage() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { studentId } = useParams();
  const fetchStudent = useCallback(() =>
    useStudent({ studentId: studentId.toLocaleLowerCase() })
  );
  const student = fetchStudent();

  if (!student) {
    return <ProfileNotFoundScreen />;
  }

  // Check if the student being viewed is the logged-in user
  if (user && studentId === user.id) {
    // Navigate to the "My Profile" screen
    navigate("/admin/profile");
  }

  console.log(student);
  return (
    <PageWrapper>
      <PageSectionHeader
        pageTitle={"Student Profile"}
        pageCrumb={`Home / Students / ${student?.firstName}`}
      />

      <StudentProfileScreen student={student} />
    </PageWrapper>
  );
}
